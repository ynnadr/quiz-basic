document.addEventListener('DOMContentLoaded', function() {

  const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name');
    const userEmail = urlParams.get('email');
    const userScore = urlParams.get('score');
    const totalScore = urlParams.get('total')

     document.getElementById('certificate-name').textContent = userName;
     document.getElementById('certificate-email').textContent = userEmail;
      document.getElementById('certificate-score').textContent = userScore;
     document.getElementById('certificate-total').textContent = totalScore;

    // Set the current date
    const today = new Date();
     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    document.getElementById('certificate-date').textContent = formattedDate;


});