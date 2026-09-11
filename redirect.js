(function() {
  const url = new URL(window.location.href);
  
  // Si le paramètre udm n'est pas égal à 14
  if (url.searchParams.get('udm') !== '14') {
    url.searchParams.set('udm', '14');
    // Redirection immédiate avant le rendu de la page
    window.location.replace(url.toString());
  }
})();