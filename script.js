document.addEventListener('DOMContentLoaded', () => {
    // 檢查 LIFF SDK 是否正確載入
    if (typeof liff === 'undefined') {
        alert('LIFF SDK 載入失敗！');
        return;
    }

    liff.init({ liffId: '2008146558-1W8lLBL6' })
        .then(() => {
            // 檢查 LIFF 是否成功初始化
            if (!liff.isLoggedIn()) {
                alert('LIFF 尚未登入，將自動導向登入頁面。');
                liff.login();
            } else {
                alert('LIFF 初始化成功！');
                
                // 檢查是否取得 chat_message.write 權限
                const scopes = liff.getAccessToken().scopes;
                if (scopes.includes('chat_message.write')) {
                    alert('已取得 chat_message.write 權限，可以傳送訊息。');
                } else {
                    alert('LIFF 權限不足，無法傳送訊息。請檢查 LIFF 後台設定。');
                }

                const urlParams = new URLSearchParams(window.location.search);
                const task = urlParams.get('task');

                if (task) {
                    const decodedTask = decodeURIComponent(task);
                    document.getElementById('taskName').innerText = `回報「${decodedTask}」的數量`;

                    document.getElementById('reportButton').addEventListener('click', () => {
                        const quantity = document.getElementById('quantityInput').value;
                        if (quantity) {
                            alert('即將傳送訊息，請稍候...');
                            liff.sendMessages([
                                {
                                    type: 'text',
                                    text: `回報數量:${decodedTask}:${quantity}`
                                }
                            ])
                            .then(() => {
                                alert('訊息傳送成功！');
                                liff.closeWindow();
                            })
                            .catch((err) => {
                                alert(`回報失敗！錯誤訊息：${err.message}`);
                                console.error('Error sending message:', err);
                            });
                        } else {
                            alert('請輸入數量');
                        }
                    });
                } else {
                    document.getElementById('taskName').innerText = '未找到任務資訊';
                    document.getElementById('reportButton').style.display = 'none';
                }
            }
        })
        .catch((err) => {
            alert(`LIFF 初始化失敗！錯誤訊息：${err.message}`);
            console.error('LIFF initialization failed', err);
        });
});
