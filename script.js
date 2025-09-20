document.addEventListener('DOMContentLoaded', () => {
    liff.init({ liffId: 'YOUR_LIFF_ID' })
        .then(() => {
            // 從 LIFF 的 URL 參數中獲取任務資訊
            const urlParams = new URLSearchParams(window.location.search);
            const task = urlParams.get('task');

            if (task) {
                // 將任務名稱顯示在網頁上
                document.getElementById('taskName').innerText = `回報「${decodeURIComponent(task)}」的數量`;

                document.getElementById('reportButton').addEventListener('click', () => {
                    const quantity = document.getElementById('quantityInput').value;
                    if (quantity) {
                        // 使用 liff.sendMessages 將數量傳送回機器人
                        liff.sendMessages([
                            {
                                type: 'text',
                                text: `回報數量:${task}:${quantity}`
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