// 取得所選Suburb，並根據Suburb調整Title內容
const params = new URLSearchParams(window.location.search);
const suburb = params.get('suburb');

const title = document.getElementById('title');

if (suburb) {
    title.textContent = `${suburb} - Select Road`;
}
else if (!suburb) {
    title.textContent = "No Suburb Selected";
}

// 返回功能
document.getElementById('backBtn').addEventListener('click', () => {
    if (document.referrer) {
        history.back();
    } else {
        window.location.href = 'suburb search.html';
    }
});

// 取得對應Suburb之Data，並根據輸入的Road關鍵字進行搜尋
let data = [];

fetch('./data/Suburb.json')
    .then(res => res.json())
    .then(json => {
        data = json[suburb] || [];
    })
    .catch(err => {
        console.error("JSON 讀取失敗:", err);
    });

const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchInput.addEventListener('input', function() {
    const keyword = this.value.trim().toLowerCase();
    resultsDiv.innerHTML = '';

    if (!keyword) return;

    const filtered = data.filter(item =>
        item.road.toLowerCase().startsWith(keyword)
    );

    if (filtered.length === 0) {
        resultsDiv.innerHTML = `<div class="no-result">沒有找到資料</div>`;
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result';
        div.innerHTML = `
            <div class="number">${item.number}</div>
            <div class="road">${item.road}</div>
        `;
        resultsDiv.appendChild(div);
    });
});