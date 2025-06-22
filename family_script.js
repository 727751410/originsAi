// 全局变量
let currentDateInput = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeDatePicker();
    initializeRankingSelects();
    initializeFormValidation();
});

// 初始化页面
function initializePage() {
    // 设置默认值
    const husbandAlive = document.getElementById('husband-alive');
    const spouseAlive = document.getElementById('spouse-alive');
    
    if (husbandAlive) husbandAlive.value = '是';
    if (spouseAlive) spouseAlive.value = '是';
}

// Tab 切换功能
function switchTab(tabName, clickedButton) {
    try {
        // 隐藏所有tab内容
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 移除所有tab按钮的激活状态
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        // 显示选中的tab内容
        const selectedTab = document.getElementById(tabName + '-tab');
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // 激活被点击的按钮
        if (clickedButton) {
            clickedButton.classList.add('active');
        }
    } catch (error) {
        console.error('Tab切换错误:', error);
    }
}

// 初始化排行下拉选择
function initializeRankingSelects() {
    // 丈夫排行（子）
    const husbandRanking = document.getElementById('husband-ranking');
    if (husbandRanking) {
        const husbandRankingOptions = ['长子', '次子'];
        
        // 添加三子到三十子
        for (let i = 3; i <= 30; i++) {
            husbandRankingOptions.push(`${numberToChinese(i)}子`);
        }
        husbandRankingOptions.push('之子');
        
        husbandRankingOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            husbandRanking.appendChild(optionElement);
        });
    }
    
    // 配偶排行（女）
    const spouseRanking = document.getElementById('spouse-ranking');
    if (spouseRanking) {
        const spouseRankingOptions = ['长女', '次女'];
        
        // 添加三女到三十女
        for (let i = 3; i <= 30; i++) {
            spouseRankingOptions.push(`${numberToChinese(i)}女`);
        }
        spouseRankingOptions.push('之女');
        
        spouseRankingOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            spouseRanking.appendChild(optionElement);
        });
    }
}

// 数字转中文
function numberToChinese(num) {
    const chineseNumbers = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    if (num <= 10) {
        return chineseNumbers[num];
    } else if (num < 20) {
        return '十' + chineseNumbers[num - 10];
    } else if (num < 30) {
        return '二十' + chineseNumbers[num - 20];
    } else if (num === 30) {
        return '三十';
    }
    return num.toString();
}

// 处理排行下拉选择变化
function handleRankingChange(select, customInputId) {
    const customInput = document.getElementById(customInputId);
    if (customInput) {
        if (select.value === '') {
            customInput.style.display = 'block';
            customInput.focus();
        } else {
            customInput.style.display = 'none';
            customInput.value = '';
        }
    }
}

// 初始化日期选择器
function initializeDatePicker() {
    // 初始化公历年份选择
    const solarYear = document.getElementById('solar-year');
    if (solarYear) {
        // 添加年份选项（1900-2100）
        for (let year = 1900; year <= 2100; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year + '年';
            solarYear.appendChild(option);
        }
    }
    
    // 初始化公历月份选择
    const solarMonth = document.getElementById('solar-month');
    if (solarMonth) {
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month + '月';
            solarMonth.appendChild(option);
        }
    }
    
    // 初始化农历年份选择
    const lunarYear = document.getElementById('lunar-year');
    if (lunarYear) {
        for (let year = 1900; year <= 2100; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year + '年';
            lunarYear.appendChild(option);
        }
    }
    
    // 初始化农历日期选择
    const lunarDay = document.getElementById('lunar-day');
    if (lunarDay) {
        const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                          '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                          '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
        
        lunarDays.forEach(day => {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            lunarDay.appendChild(option);
        });
    }
    
    // 绑定日期选择器变化事件
    bindDatePickerEvents();
}

// 绑定日期选择器事件
function bindDatePickerEvents() {
    // 公历日期变化
    const solarYear = document.getElementById('solar-year');
    const solarMonth = document.getElementById('solar-month');
    
    if (solarYear) solarYear.addEventListener('change', updateSolarDays);
    if (solarMonth) solarMonth.addEventListener('change', updateSolarDays);
    
    // 绑定所有日期相关的输入框变化事件
    const dateInputs = ['solar-year', 'solar-month', 'solar-day', 'solar-hour',
                       'lunar-year', 'lunar-month', 'lunar-day', 'lunar-hour', 'custom-date'];
    
    dateInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updateDatePreview);
            element.addEventListener('input', updateDatePreview);
        }
    });
}

// 更新公历日期选项
function updateSolarDays() {
    const year = parseInt(document.getElementById('solar-year').value);
    const month = parseInt(document.getElementById('solar-month').value);
    const daySelect = document.getElementById('solar-day');
    
    if (daySelect) {
        // 清空现有选项
        daySelect.innerHTML = '<option value="">请选择</option>';
        
        if (year && month) {
            const daysInMonth = new Date(year, month, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day + '日';
                daySelect.appendChild(option);
            }
        }
        
        updateDatePreview();
    }
}

// 更新日期预览
function updateDatePreview() {
    const previewElement = document.getElementById('date-preview-text');
    if (!previewElement) return;
    
    let previewText = '';
    
    // 获取当前活跃的日期tab
    const activeDateTab = document.querySelector('.date-tab-content.active');
    if (!activeDateTab) return;
    
    if (activeDateTab.id === 'solar-tab') {
        // 公历预览
        const year = document.getElementById('solar-year').value;
        const month = document.getElementById('solar-month').value;
        const day = document.getElementById('solar-day').value;
        const hour = document.getElementById('solar-hour').value;
        
        if (year || month || day || hour) {
            previewText = '公历 ';
            if (year) previewText += year + '年';
            if (month) previewText += month + '月';
            if (day) previewText += day + '日';
            if (hour) previewText += ' ' + hour;
        }
    } else if (activeDateTab.id === 'lunar-tab') {
        // 农历预览
        const year = document.getElementById('lunar-year').value;
        const month = document.getElementById('lunar-month').value;
        const day = document.getElementById('lunar-day').value;
        const hour = document.getElementById('lunar-hour').value;
        
        if (year || month || day || hour) {
            previewText = '农历 ';
            if (year) previewText += year + '年';
            if (month) previewText += month;
            if (day) previewText += day;
            if (hour) previewText += ' ' + hour;
        }
    } else if (activeDateTab.id === 'custom-tab') {
        // 自定义预览
        const customDate = document.getElementById('custom-date').value;
        if (customDate.trim()) {
            previewText = customDate.trim();
        }
    }
    
    previewElement.textContent = previewText || '请选择日期';
}

// 日期tab切换
function switchDateTab(tabName) {
    // 隐藏所有日期tab内容
    document.querySelectorAll('.date-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 移除所有日期tab按钮的激活状态
    document.querySelectorAll('.date-tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // 显示选中的日期tab内容
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // 激活选中的日期tab按钮
    const selectedButton = event.target;
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // 更新预览
    updateDatePreview();
}

// 打开日期选择模态窗口
function openDateModal(inputId) {
    currentDateInput = inputId;
    const modal = document.getElementById('dateModal');
    if (modal) {
        modal.style.display = 'block';
        resetDatePicker();
        
        // 如果输入框已有值，尝试解析并设置
        const input = document.getElementById(inputId);
        if (input && input.value) {
            parseAndSetDate(input.value);
        }
    }
}

// 关闭日期选择模态窗口
function closeDateModal() {
    const modal = document.getElementById('dateModal');
    if (modal) {
        modal.style.display = 'none';
        currentDateInput = null;
    }
}

// 重置日期选择器
function resetDatePicker() {
    // 重置所有日期输入
    const dateInputs = ['solar-year', 'solar-month', 'solar-day', 'solar-hour',
                       'lunar-year', 'lunar-month', 'lunar-day', 'lunar-hour', 'custom-date'];
    
    dateInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });
    
    // 重置日期tab到公历
    document.querySelectorAll('.date-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.date-tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    const solarTab = document.getElementById('solar-tab');
    const solarButton = document.querySelector('.date-tab-button');
    if (solarTab) solarTab.classList.add('active');
    if (solarButton) solarButton.classList.add('active');
    
    // 重置预览
    updateDatePreview();
}

// 解析并设置日期
function parseAndSetDate(dateString) {
    // 这里可以根据需要实现日期字符串的解析逻辑
    // 暂时简单地将其设置到自定义tab
    const customDate = document.getElementById('custom-date');
    if (customDate) {
        customDate.value = dateString;
        switchDateTab('custom');
        updateDatePreview();
    }
}

// 确认日期选择
function confirmDate() {
    if (!currentDateInput) return;
    
    const previewText = document.getElementById('date-preview-text').textContent;
    const input = document.getElementById(currentDateInput);
    
    if (input && previewText && previewText !== '请选择日期') {
        input.value = previewText;
        validateField(input);
    }
    
    closeDateModal();
}

// 初始化表单验证
function initializeFormValidation() {
    // 为所有输入框添加实时验证
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
            updateCharCount(this);
        });
    });
    
    // 初始化字符计数
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        updateCharCount(input);
    });
}

// 验证单个字段
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    // 移除之前的错误状态
    formGroup.classList.remove('error');
    if (errorMessage) {
        errorMessage.remove();
    }
    
    let isValid = true;
    let message = '';
    
    // 必填字段验证
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = '此字段为必填项';
    }
    
    // 长度验证
    const maxLength = field.getAttribute('maxlength');
    if (maxLength && field.value.length > parseInt(maxLength)) {
        isValid = false;
        message = `字符长度不能超过${maxLength}个`;
    }
    
    // 数字验证
    if (field.type === 'number' && field.value && isNaN(field.value)) {
        isValid = false;
        message = '请输入有效的数字';
    }
    
    if (!isValid) {
        formGroup.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    return isValid;
}

// 更新字符计数
function updateCharCount(field) {
    const maxLength = field.getAttribute('maxlength');
    if (!maxLength) return;
    
    const formGroup = field.closest('.form-group');
    let charCount = formGroup.querySelector('.char-count');
    
    if (!charCount) {
        charCount = document.createElement('div');
        charCount.className = 'char-count';
        formGroup.appendChild(charCount);
    }
    
    const currentLength = field.value.length;
    const maxLen = parseInt(maxLength);
    
    charCount.textContent = `${currentLength}/${maxLen}`;
    
    if (currentLength > maxLen * 0.9) {
        charCount.classList.add('warning');
    } else {
        charCount.classList.remove('warning');
    }
}

// 生成世系表
function generateGenealogyTable() {
    // 验证所有字段
    const inputs = document.querySelectorAll('input, textarea, select');
    let isAllValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isAllValid = false;
        }
    });
    
    if (!isAllValid) {
        showMessage('请检查并修正表单中的错误', 'error');
        return;
    }
    
    // 收集表单数据
    const formData = {
        husband: {
            name: (document.getElementById('husband-surname') ? document.getElementById('husband-surname').value : '') + 
                  (document.getElementById('husband-firstname') ? document.getElementById('husband-firstname').value : ''),
            surname: document.getElementById('husband-surname') ? document.getElementById('husband-surname').value : '',
            firstname: document.getElementById('husband-firstname') ? document.getElementById('husband-firstname').value : '',
            birth: document.getElementById('husband-birthday') ? document.getElementById('husband-birthday').value : '',
            death: document.getElementById('husband-deathday') ? document.getElementById('husband-deathday').value : '',
            burial: document.getElementById('husband-burial') ? document.getElementById('husband-burial').value : '',
            style: document.getElementById('husband-zi') ? document.getElementById('husband-zi').value : '',
            alias: document.getElementById('husband-hao') ? document.getElementById('husband-hao').value : '',
            praise: document.getElementById('husband-intro') ? document.getElementById('husband-intro').value : '',
            education: document.getElementById('husband-education') ? document.getElementById('husband-education').value : '',
            occupation: document.getElementById('husband-position') ? document.getElementById('husband-position').value : '',
            avatar: null
        },
        spouse: {
            name: (document.getElementById('spouse-surname') ? document.getElementById('spouse-surname').value : '') + 
                  (document.getElementById('spouse-firstname') ? document.getElementById('spouse-firstname').value : ''),
            surname: document.getElementById('spouse-surname') ? document.getElementById('spouse-surname').value : '',
            firstname: document.getElementById('spouse-firstname') ? document.getElementById('spouse-firstname').value : '',
            birth: document.getElementById('spouse-birthday') ? document.getElementById('spouse-birthday').value : '',
            death: document.getElementById('spouse-deathday') ? document.getElementById('spouse-deathday').value : '',
            burial: document.getElementById('spouse-burial') ? document.getElementById('spouse-burial').value : '',
            avatar: null
        }
    };

    // 生成世系表HTML
    createGenealogyTable(formData);
    
    // 显示成功消息
    showMessage('世系表生成成功！', 'success');
}

// 创建世系表
function createGenealogyTable(formData) {
    const genealogyTable = document.getElementById('genealogyTable');
    
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
    checkAndCreateSecondPage(formData, genealogyTable);
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
    personAvatar.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiB2aWV3Qm94PSIwIDAgODAgMTEwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSIjRENEQ0RDIi8+CjxyZWN0IHg9IjIwIiB5PSI1MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRENEQ0RDIi8+Cjwvc3ZnPgo=';
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

    // 将所有字段组合成一行文本，对赞语特殊处理
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
    spouseAvatar.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiB2aWV3Qm94PSIwIDAgODAgMTEwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iMTEwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSIjRENEQ0RDIi8+CjxyZWN0IHg9IjIwIiB5PSI1MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRENEQ0RDIi8+Cjwvc3ZnPgo=';
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

function checkAndCreateSecondPage(formData, genealogyTable) {
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
                // 创建新的世代行用于第二页
                const secondRow = document.createElement('div');
                secondRow.className = 'generation-row';
                
                // 添加世代标识
                const secondLabel = document.createElement('div');
                secondLabel.className = 'generation-label';
                secondLabel.textContent = '三世';
                secondRow.appendChild(secondLabel);
                
                // 移动配偶信息到第二页
                secondRow.appendChild(spouseBlock);
                page2.appendChild(secondRow);
            }
        }
    }, 100);
}



// 显示消息
function showMessage(message, type = 'info') {
    // 移除现有的消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type === 'success' ? 'success-message' : 'error-message'}`;
    messageDiv.textContent = message;
    
    // 插入到容器顶部
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// 点击模态窗口外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('dateModal');
    if (event.target === modal) {
        closeDateModal();
    }
}

// 键盘事件处理
document.addEventListener('keydown', function(event) {
    // ESC键关闭模态窗口
    if (event.key === 'Escape') {
        closeDateModal();
    }
}); 