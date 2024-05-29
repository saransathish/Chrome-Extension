// const newProfilePicUrl = 'https://images.pexels.com/photos/3039036/pexels-photo-3039036.jpeg';

function replaceProfilePictures(newProfilePicUrl) {
  const profilePics = document.querySelectorAll('img');
  profilePics.forEach(pic => {
    if (pic.alt.toLowerCase().includes("profile photo") || pic.classList.contains("EntityPhoto-circle-0") || pic.classList.contains("EntityPhoto-circle-3") || pic.classList.contains("EntityPhoto-square-3") || pic.classList.contains("EntityPhoto-circle-1") ||pic.classList.contains("EntityPhoto-circle-3-ghost-person")  || pic.classList.contains("discover-entity-type-card__image-circle--dash") || pic.classList.contains("ivm-view-attr__ghost-entity") || pic.classList.contains("ivm-image-view-model__circle-img")  || pic.classList.contains("EntityPhoto-square-1") ){
      console.log('Replacing image:', pic.src, 'with', newProfilePicUrl);
      pic.src = newProfilePicUrl;

      pic.onload = () => console.log('Image loaded successfully');
      pic.onerror = () => console.log('Failed to load image');
    }
  });

}

window.addEventListener('load', () => {
  chrome.storage.local.get('profileImage', function(data) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      if (data.profileImage) {
        replaceProfilePictures(data.profileImage);
      }
    }
  });
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateProfileImage' && message.imageUrl) {
    replaceProfilePictures(message.imageUrl);
  }
});


// replaceProfilePictures();

// const observer = new MutationObserver(replaceProfilePictures);

const observer = new MutationObserver(() => {
  chrome.storage.local.get('profileImage', function(data) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      if (data.profileImage) {
        replaceProfilePictures(data.profileImage);
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
