document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const postsContainer = document.getElementById("post_container");
    const postTemplate = document.getElementById("post-template");
    const filtroCategoria = document.getElementById("filtro-categoria");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const postText = document.getElementById("post").value;
        const category = document.getElementById("categoria").value;

        addPost(postText, category);
        form.reset();
    });

    filtroCategoria.addEventListener("change", filtrarPosts);

    function addPost(text, category) {
        const postClone = document.importNode(postTemplate.content, true);
        const postTextElement = postClone.querySelector(".post_text");
        postTextElement.textContent = text;

        postClone.querySelector(".category").textContent = `Categoria: ${category}`;
        const currentDate = new Date();
        postClone.querySelector(".date").textContent = `Data: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

        const editButton = postClone.querySelector(".edit");
        const deleteButton = postClone.querySelector(".delete");

        editButton.addEventListener("click", function() {
            const newText = prompt("Edite seu post:", postTextElement.textContent);
            if (newText !== null) {
                postTextElement.textContent = newText;
            }
        });

        deleteButton.addEventListener("click", function() {
            deleteButton.closest(".post").remove();
        });

        postsContainer.appendChild(postClone);
    }

    function filtrarPosts() {
        const categoriaSelecionada = filtroCategoria.value;
        const posts = document.querySelectorAll(".post");

        posts.forEach(post => {
            const categoriaPost = post.querySelector(".category").textContent.replace("Categoria: ", "");

            if (categoriaSelecionada === "Todos" || categoriaPost === categoriaSelecionada) {
                post.style.display = "flex";
            } else {
                post.style.display = "none";
            }
        });
    }
});
