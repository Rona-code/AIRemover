function removeAIOverview() {
  // 1. Suppression via l'élément custom Google principal
  const aiComponents = document.querySelectorAll('block-component, g-section-with-header');
  aiComponents.forEach(el => {
    if (el.textContent.includes('Aperçu IA') || el.textContent.includes('AI Overview')) {
      el.remove();
    }
  });

  // 2. Traitement des éléments encapsulés dans le Shadow DOM
  function walkDOM(node) {
    if (!node) return;

    // Si le nœud contient le texte "Aperçu IA"
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.textContent && node.textContent.includes('Aperçu IA')) {
        // Cible la carte englobante (souvent la classe MjjYud ou un div parent haut)
        const container = node.closest('.MjjYud') || node.closest('div[jscontroller]');
        if (container && container.style.display !== 'none') {
          container.style.display = 'none';
        }
      }

      // Explorer le Shadow DOM s'il existe
      if (node.shadowRoot) {
        walkDOM(node.shadowRoot);
      }
    }

    // Parcourir les enfants
    let child = node.firstChild;
    while (child) {
      walkDOM(child);
      child = child.nextSibling;
    }
  }

  walkDOM(document.body);
}

// Exécution au chargement et surveillance dynamique
removeAIOverview();
const observer = new MutationObserver(removeAIOverview);
observer.observe(document.body, { childList: true, subtree: true });