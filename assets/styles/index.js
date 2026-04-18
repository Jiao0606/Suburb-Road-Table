let data = [];

fetch('../data/Area.json')
    .then(res => res.json())
    .then(json => {
        data = json.Success;
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