document.addEventListener('DOMContentLoaded', () => {
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
            console.error('LIFF initialization failed', err);
        });
});
