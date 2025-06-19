document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('genealogyForm');
    const genealogyTable = document.getElementById('genealogyTable');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // 测试一下回滚
        // 获取表单数据
        const formData = {
            husband: {
                name: document.getElementById('husbandName').value,
                birth: document.getElementById('husbandBirth').value,
                death: document.getElementById('husbandDeath').value,
                burial: document.getElementById('husbandBurial').value,
                style: document.getElementById('husbandStyle').value,
                alias: document.getElementById('husbandAlias').value,
                praise: document.getElementById('husbandPraise').value,
                education: document.getElementById('husbandEducation').value,
                occupation: document.getElementById('husbandOccupation').value,
                avatar: document.getElementById('husbandAvatar').files[0]
            },
            spouse: {
                name: document.getElementById('spouseName').value,
                birth: document.getElementById('spouseBirth').value,
                death: document.getElementById('spouseDeath').value,
                burial: document.getElementById('spouseBurial').value,
                avatar: document.getElementById('spouseAvatar').files[0]
            }
        };

        // 生成世系表HTML
        generateGenealogyTable(formData);
    });

    function generateGenealogyTable(formData) {
        // 清空现有内容
        genealogyTable.innerHTML = '';
        
        // 创建第一页
        const page1 = createPage(1);
        genealogyTable.appendChild(page1);
        
        // 创建世代行
        const row = document.createElement('div');
        row.className = 'generation-row';

        // 世代标识
        const generationLabel = document.createElement('div');
        generationLabel.className = 'generation-label';
        generationLabel.textContent = '三世';
        row.appendChild(generationLabel);

        // 创建丈夫信息块 - 完整展示所有信息
        const husbandBlock = createHusbandBlock(formData.husband);
        row.appendChild(husbandBlock);

        // 创建配偶信息块
        const spouseBlock = createSpouseBlock(formData.spouse);
        row.appendChild(spouseBlock);

        page1.appendChild(row);
        
        // 检查是否需要第二页
        checkAndCreateSecondPage(formData);
    }

    function createPage(pageNumber) {
        const page = document.createElement('div');
        page.className = 'genealogy-page';
        page.id = `page-${pageNumber}`;
        
        if (pageNumber > 1) {
            page.style.pageBreakBefore = 'always';
            page.style.marginTop = '50px';
        }
        
        return page;
    }

    function createHusbandBlock(husbandData) {
        const personBlock = document.createElement('div');
        personBlock.className = 'person-block';

        const personContentWrapper = document.createElement('div');
        personContentWrapper.className = 'content-wrapper';

        // 丈夫名字
        const personName = document.createElement('div');
        personName.className = 'person-name';
        personName.textContent = husbandData.name;
        personContentWrapper.appendChild(personName);

        // 丈夫头像
        const personAvatar = document.createElement('img');
        personAvatar.className = 'person-avatar';
        if (husbandData.avatar) {
            personAvatar.src = URL.createObjectURL(husbandData.avatar);
        } else {
            personAvatar.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiB2aWV3Qm94PSIwIDAgODAgMTEwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSIjRENEQ0RDIi8+CjxyZWN0IHg9IjIwIiB5PSI1MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRENEQ0RDIi8+Cjwvc3ZnPgo=';
        }
        personAvatar.alt = '丈夫头像';
        personContentWrapper.appendChild(personAvatar);

        // 丈夫详细信息
        const personDetailsWrapper = document.createElement('div');
        personDetailsWrapper.className = 'details-wrapper';

        // 创建一个单独的div来包含所有字段信息
        const allDetailsText = document.createElement('div');
        allDetailsText.className = 'all-details-text';

        // 按照指定顺序创建丈夫的所有字段
        const husbandFields = [
            { label: '字', value: husbandData.style },
            { label: '号', value: husbandData.alias },
            { label: '', value: husbandData.praise },
            { label: '', value: husbandData.education },
            { label: '', value: husbandData.occupation },
            { label: '生于', value: husbandData.birth },
            { label: '歿于', value: husbandData.death },
            { label: '葬于', value: husbandData.burial }
        ];

        // 将所有字段组合成一行文本
        let fieldsText = '';
        husbandFields.forEach((field, index) => {
            if (field.value && field.value.trim() !== '') {
                fieldsText += `${field.label}${field.value}`;
            }
        });

        // 将文本按每7个字符分割成行
        let formattedText = '';
        for (let i = 0; i < fieldsText.length; i += 7) {
            formattedText += fieldsText.slice(i, i + 7) + (i + 7 < fieldsText.length ? '\n' : '');
        }

        allDetailsText.textContent = formattedText;
        allDetailsText.style.whiteSpace = 'pre-wrap';
        personDetailsWrapper.appendChild(allDetailsText);
        personContentWrapper.appendChild(personDetailsWrapper);
        personBlock.appendChild(personContentWrapper);

        return personBlock;
    }

    function createSpouseBlock(spouseData) {
        const spouseBlock = document.createElement('div');
        spouseBlock.className = 'spouse-block';

        const spouseContentWrapper = document.createElement('div');
        spouseContentWrapper.className = 'content-wrapper';

        // 配偶名字
        const spouseName = document.createElement('div');
        spouseName.className = 'spouse-name';
        spouseName.textContent = spouseData.name;
        spouseContentWrapper.appendChild(spouseName);

        // 配偶头像
        const spouseAvatar = document.createElement('img');
        spouseAvatar.className = 'spouse-avatar';
        if (spouseData.avatar) {
            spouseAvatar.src = URL.createObjectURL(spouseData.avatar);
        } else {
            spouseAvatar.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiB2aWV3Qm94PSIwIDAgODAgMTEwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSIjRENEQ0RDIi8+CjxyZWN0IHg9IjIwIiB5PSI1MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRENEQ0RDIi8+Cjwvc3ZnPgo=';
        }
        spouseAvatar.alt = '配偶头像';
        spouseContentWrapper.appendChild(spouseAvatar);

        // 配偶详细信息
        const spouseDetailsWrapper = document.createElement('div');
        spouseDetailsWrapper.className = 'details-wrapper';

        // 创建一个单独的div来包含所有字段信息
        const allDetailsText = document.createElement('div');
        allDetailsText.className = 'all-details-text';

        // 按照指定顺序创建配偶的字段
        const spouseFields = [
            { label: '生于', value: spouseData.birth },
            { label: '歿于', value: spouseData.death },
            { label: '葬于', value: spouseData.burial }
        ];

        // 将所有字段组合成一行文本
        let fieldsText = '';
        spouseFields.forEach((field, index) => {
            if (field.value && field.value.trim() !== '') {
                fieldsText += `${field.label}${field.value}`;
            }
        });

        // 将文本按每7个字符分割成行
        let formattedText = '';
        for (let i = 0; i < fieldsText.length; i += 7) {
            formattedText += fieldsText.slice(i, i + 7) + (i + 7 < fieldsText.length ? '\n' : '');
        }

        allDetailsText.textContent = formattedText;
        allDetailsText.style.whiteSpace = 'pre-wrap';
        spouseDetailsWrapper.appendChild(allDetailsText);
        spouseContentWrapper.appendChild(spouseDetailsWrapper);
        spouseBlock.appendChild(spouseContentWrapper);

        return spouseBlock;
    }

    function checkAndCreateSecondPage(formData) {
        // 使用setTimeout确保DOM已经渲染完成
        setTimeout(() => {
            const firstPage = document.getElementById('page-1');
            const generationRow = firstPage.querySelector('.generation-row');
            
            // 检查是否超出容器宽度
            const containerWidth = genealogyTable.offsetWidth;
            const rowWidth = generationRow.scrollWidth;
            
            if (rowWidth > containerWidth) {
                // 创建第二页
                const page2 = createPage(2);
                genealogyTable.appendChild(page2);
                
                // 将配偶信息移动到第二页
                const spouseBlock = firstPage.querySelector('.spouse-block');
                if (spouseBlock) {
                    spouseBlock.remove();
                    
                    // 在第二页创建新的世代行
                    const row2 = document.createElement('div');
                    row2.className = 'generation-row';
                    
                    // 世代标识
                    const generationLabel2 = document.createElement('div');
                    generationLabel2.className = 'generation-label';
                    generationLabel2.textContent = '三世（续）';
                    row2.appendChild(generationLabel2);
                    
                    // 重新创建配偶信息块
                    const spouseBlock2 = createSpouseBlock(formData.spouse);
                    row2.appendChild(spouseBlock2);
                    
                    page2.appendChild(row2);
                }
            }
        }, 100);
    }

    // 将数字转换为中文世代
    function numberToChineseGeneration(num) {
        const chineseNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        if (num <= 10) {
            return chineseNums[num - 1];
        }
        return num.toString();
    }

    // 处理文件上传预览
    function handleFileUpload(input, previewId) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById(previewId);
                    if (preview) {
                        preview.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 初始化文件上传预览
    handleFileUpload(document.getElementById('husbandAvatar'), 'husbandAvatarPreview');
    handleFileUpload(document.getElementById('spouseAvatar'), 'spouseAvatarPreview');
}); 