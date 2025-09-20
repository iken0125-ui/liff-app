document.addEventListener('DOMContentLoaded', () => {
    liff.init({ liffId: '2008146378-KP8y1pea' })
        .then(() => {
            // 從 LIFF 的 URL 參數中獲取任務資訊
            const urlParams = new URLSearchParams(window.location.search);
            const task = urlParams.get('task');

            if (task) {
                // 將任務名稱顯示在網頁上，並進行 URI 解碼以正確顯示中文
                const decodedTask = decodeURIComponent(task);
                document.getElementById('taskName').innerText = `回報「${decodedTask}」的數量`;

                document.getElementById('reportButton').addEventListener('click', () => {
                    const quantity = document.getElementById('quantityInput').value;
                    if (quantity) {
                        // 使用 liff.sendMessages 將數量傳送回機器人
                        // 這裡傳送的 task 必須是未編碼的原始字串，與 Apps Script 匹配
                        liff.sendMessages([
                            {
                                type: 'text',
                                text: `回報數量:${decodedTask}:${quantity}` // 使用已解碼的字串
                            }
                        ])
                        .then(() => {
                            liff.closeWindow();
                        })
                        .catch((err) => {
                            console.error('Error sending message:', err);
                        });
                    }
                });
            } else {
                document.getElementById('taskName').innerText = '未找到任務資訊';
                document.getElementById('reportButton').style.display = 'none';
            }
        })
        .catch((err) => {
            console.error('LIFF initialization failed', err);
        });
});
