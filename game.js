const textElement = document.getElementById('text');
const optionBtns = document.getElementById('option-buttons');

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Clear the media container before appending the new media element
  const mediaContainer = document.querySelector('.media');
  while (mediaContainer.firstChild) {
    mediaContainer.removeChild(mediaContainer.firstChild);
  }

  // Display the media in the media container
  const mediaElement = createMediaElement(textNode.media);
  mediaContainer.appendChild(mediaElement);

    textElement.innerText = textNode.text
    while (optionBtns.firstChild) {
        optionBtns.removeChild(optionBtns.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionBtns.appendChild(button)
        }
    })
}

function createMediaElement(media) {
    switch (media.type) {
      case 'image':
        const imageElement = document.createElement('img');
        imageElement.src = media.source;
        return imageElement;
      case 'video':
        const videoElement = document.createElement('video');
        videoElement.src = media.source;
        videoElement.controls = true;
        videoElement.autoplay = true;

        return videoElement;
      case 'gif':
      const gifElement = document.createElement('img');
      gifElement.src = media.source;
      // You can add any additional styling or classes for GIFs
      return gifElement;
    case 'audio':
      const audioElement = document.createElement('audio');
      audioElement.src = media.source;
      audioElement.controls = true;
      // Add the autoplay attribute to enable autoplay for audio if needed
      // audioElement.autoplay = true;
      return audioElement;
      default:
        return null; // Unsupported media type
    }
  }
  

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of blue goo near you.',
        media: {
            type: 'image',
            source: '/images/goo.png',
        },
        options: [
            {
                text: 'Take goo',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Leave goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers. You arrive at a road with a merchant along the side.',
        media: {
            type: 'video',
            source: '/images/sword.mp4',
        },
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Pass the merchant',
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to fell tired and stumble upon a small town next to a dark looking castle.',
        media: {
            type: 'image',
            source: '/images/town.png',
        },
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find an inn with a room in town',
                nextText: 5
            },
            {
                text: 'Find some way hay in a stable to sleep in',
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep. - The end',
        media: {
            type: 'image',
            source: '/images/monster.png',
        },
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Without any money to rent a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town gard lock you in a cell... at least you have a place to sleep - The end',
        media: {
            type: 'image',
            source: '/images/inn.png',
        },
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You found a stable with some hay to sleep on. You were found by the owners; they offered you hot soup and a warm fire. You all became lifelong friends. You never discovered how you got there or what happened to you. - the end',
        media: {
            type: 'image',
            source: '/images/stable.png',
        },
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
]

startGame();