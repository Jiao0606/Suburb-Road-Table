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
        window.location.href = 'index.html';
    }
});

// 清除搜尋框內容
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('search').value = '';
    document.getElementById('results').innerHTML = '';
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
        resultsDiv.innerHTML = `<div class="no-result">No results found</div>`;
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

// 回到頁面頂部功能
const topBtn = document.getElementById('topBtn');

// 滾動時顯示 / 隱藏
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        topBtn.style.display = 'block';
    } else {
        topBtn.style.display = 'none';
    }
});

// 點擊回到頂部
topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});