document.querySelectorAll('.area-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const area = btn.dataset.area;

        window.location.href =
            `suburb-search.html?area=${area}`;
    });
});