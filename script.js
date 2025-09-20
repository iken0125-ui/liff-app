document.addEventListener('DOMContentLoaded', () => {
    // 檢查 LIFF SDK 是否正確載入
    if (typeof liff === 'undefined') {
        alert('LIFF SDK 載入失敗！請聯繫管理員。');
        return;
    }

    liff.init({ liffId: '2008146558-1W8lLBL6' })
        .then(() => {
            if (!liff.isLoggedIn()) {
                liff.login();
            } else {
                const urlParams = new URLSearchParams(window.location.search);
                const task = urlParams.get('task');

                if (task) {
                    const decodedTask = decodeURIComponent(task);
                    document.getElementById('taskName').innerText = `回報「${decodedTask}」的數量`;

                    document.getElementById('reportButton').addEventListener('click', () => {
                        const quantity = document.getElementById('quantityInput').value;
                        if (quantity) {
                            liff.sendMessages([
                                {
                                    type: 'text',
                                    text: `回報數量:${decodedTask}:${quantity}`
                                }
                            ])
                            .then(() => {
                                liff.closeWindow();
                            })
                            .catch((err) => {
                                // 捕捉錯誤並發送給使用者
                                const errorMessage = `回報失敗，請將以下訊息告知管理者：\n${err.message}`;
                                liff.sendMessages([{ type: 'text', text: errorMessage }]);
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
            // 捕捉初始化失敗的錯誤
            alert(`LIFF 初始化失敗！錯誤訊息：${err.message}`);
        });
});
