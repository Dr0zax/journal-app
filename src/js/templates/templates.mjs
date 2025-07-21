export function quoteTemp(data) {
    return `<p>${data.text}</p>
    <p>-${data.author}</p>
    `
}

export function entryTemp(data) {
    const date = new Date(data.created_at)
    const timestamp = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });

    return `<div class="module entry">
        <a class="entry-link" href="/entry/entry.html?id=${data.id}"><h2>${timestamp}</h2></a>
        <div class="module-content">
            ${data.content}
        </div>
    </div>`
}