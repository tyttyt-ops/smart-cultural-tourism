// 腾讯云函数：检查任务状态
const fetch = require('node-fetch');

// 模拟任务存储
const taskStore = new Map();

exports.main = async (event, context) => {
    try {
        // 解析请求参数
        const body = JSON.parse(event.body);
        const { task_id, task_type } = body;
        
        // 验证参数
        if (!task_id || !task_type) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    status: 'error',
                    message: '请提供任务ID和任务类型'
                })
            };
        }
        
        // 获取任务信息
        let taskInfo = taskStore.get(task_id);
        
        // 如果任务不存在，初始化任务
        if (!taskInfo) {
            taskInfo = {
                task_id: task_id,
                task_type: task_type,
                status: 'processing',
                progress: 0,
                created_at: new Date().toISOString()
            };
            taskStore.set(task_id, taskInfo);
        }
        
        // 更新任务进度
        taskInfo.progress = Math.min(100, taskInfo.progress + Math.floor(Math.random() * 20));
        const isCompleted = taskInfo.progress >= 100;
        
        // 如果任务完成，添加结果数据
        if (isCompleted) {
            taskInfo.status = 'completed';
            
            if (task_type === 'ip') {
                // 从请求参数中获取原始数据
                // 实际项目中，这里应该从存储中获取原始请求数据
                taskInfo.ip_name = '智能IP形象';
                taskInfo.ip_type = '吉祥物';
                taskInfo.ip_style = '卡通风格';
                taskInfo.description = '基于用户需求生成的智能IP形象';
                taskInfo.image_url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('digital IP character 智能IP 卡通风格')}`;
                taskInfo.details = 'IP形象生成成功，包含三视图、表情动作库等完整设计方案。';
            } else {
                taskInfo.model_name = '智能3D模型';
                taskInfo.model_type = '角色模型';
                taskInfo.description = '基于用户需求生成的3D模型';
                taskInfo.model_url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('3D model 智能模型 角色')}`;
                taskInfo.details = '3D模型生成成功，包含模型文件、材质贴图等完整设计方案。';
            }
        }
        
        // 更新任务存储
        taskStore.set(task_id, taskInfo);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                data: taskInfo
            })
        };
    } catch (error) {
        console.error('检查任务状态失败:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: 'error',
                message: '检查任务状态失败，请稍后重试'
            })
        };
    }
}