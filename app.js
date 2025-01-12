document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbacksContainer = document.getElementById("feedbacks");

    // Carregar feedbacks ao carregar a página
    loadFeedbacks();

    // Enviar feedback para o servidor
    feedbackForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const area = document.getElementById("area").value;
        const nivel = document.getElementById("nivel").value;
        const feedback = document.getElementById("feedback").value;

        const data = { usuario, area, nivel, feedback };

        fetch('http://localhost:3000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => {
            loadFeedbacks(); // Atualiza os feedbacks após envio
            feedbackForm.reset(); // Limpa o formulário
        })
        .catch(error => {
            console.error('Erro ao salvar feedback:', error);
        });
    });

    // Função para carregar feedbacks do servidor
    function loadFeedbacks() {
        fetch('http://localhost:3000/feedbacks')
            .then(response => response.json())
            .then(feedbacks => {
                feedbacksContainer.innerHTML = feedbacks.map(feedback => `
                    <div class="feedback-item">
                        <strong>Usuário:</strong> ${feedback.usuario} <br>
                        <strong>Área:</strong> ${feedback.area} <br>
                        <strong>Nível:</strong> ${feedback.nivel} <br>
                        <strong>Feedback:</strong> ${feedback.feedback} <br>
                        <strong>Data:</strong> ${new Date(feedback.data).toLocaleString()}
                    </div>
                `).join('');
            })
            .catch(error => {
                console.error('Erro ao carregar feedbacks:', error);
            });
    }
});
