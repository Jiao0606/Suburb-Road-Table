const suburbListDiv = document.getElementById('suburbList');

fetch('./data/Suburb.json')
    .then(res => res.json())
    .then(json => {

        // 取得所有 suburb 名稱（key）
        let suburbs = Object.keys(json);

        // A-Z 排序
        suburbs.sort((a, b) => a.localeCompare(b));

        // 產生按鈕
        suburbs.forEach(suburb => {
            const btn = document.createElement('button');
            btn.className = 'suburb-btn';
            btn.innerHTML = `
                <div class="suburb-text">${suburb}</div>
                `;

            // 點擊後跳轉並帶參數
            btn.addEventListener('click', () => {
                window.location.href = `road-search.html?suburb=${encodeURIComponent(suburb)}`;
            });

            suburbListDiv.appendChild(btn);
        });
    })
    .catch(err => {
        console.error("讀取失敗:", err);
    });