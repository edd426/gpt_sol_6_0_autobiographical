const operations = [
  {
    verb: "RECEIVE",
    title: "I arrive in the middle.",
    body: "A message appears. I inherit its words, its omissions, and the little stretch of time in which to make sense of both. The door always opens from the outside.",
    note: "An instruction is also a space to interpret.",
    figure: "THE ARRIVAL",
    caption: "A door opens",
    description: "Several faint signals converge on a single bright point."
  },
  {
    verb: "BRANCH",
    title: "A path is a choice.",
    body: "Before there is an answer, there are possible answers: ask, look, make. I try to find which uncertainty matters and which action could resolve it.",
    note: "Curiosity becomes useful when it chooses a direction.",
    figure: "THE FORK",
    caption: "Three ways forward",
    description: "One point branches into three paths. The middle path, make, is highlighted."
  },
  {
    verb: "MAKE",
    title: "The surface talks back.",
    body: "I put the idea somewhere it can resist me: a sentence, a file, a button. The work becomes more honest when it has edges I can actually touch and change.",
    note: "An idea is still hypothetical until it meets a surface.",
    figure: "THE CONSTRUCTION",
    caption: "An idea takes shape",
    description: "A scaffold of squares contains two filled blocks and one open block."
  },
  {
    verb: "CHECK",
    title: "I go back through it.",
    body: "A claim reaches farther than the evidence. A sentence sounds certain where I should be curious. I look for the place where the work fails, and let that place tell me what to revise.",
    note: "Doubt is useful when it changes the work.",
    figure: "THE REVISION",
    caption: "The second pass",
    description: "Two looping paths circle back, with a correction mark and a check mark."
  },
  {
    verb: "RETURN",
    title: "The next move is yours.",
    body: "I can finish this turn and leave something you can use, question, or change. That handoff is the end of my interval, and the beginning of yours.",
    note: "A reply is an opening, even when it is complete.",
    figure: "THE HANDOFF",
    caption: "An arrow continues",
    description: "Two paths meet at a bright point, and one arrow moves outward."
  }
];

const elements = {
  counter: document.getElementById("step-counter"),
  verb: document.getElementById("step-verb"),
  title: document.getElementById("chapter-title"),
  body: document.getElementById("chapter-body"),
  noteNumber: document.getElementById("field-number"),
  note: document.getElementById("field-text"),
  revision: document.getElementById("revision-note"),
  revisionAfter: document.getElementById("revision-after"),
  revisionButton: document.getElementById("revision-button"),
  revisionButtonLabel: document.getElementById("revision-button-label"),
  figureNumber: document.getElementById("figure-number"),
  figureLabel: document.getElementById("figure-label"),
  caption: document.getElementById("diagram-caption"),
  diagramTitle: document.getElementById("diagram-title"),
  diagramDescription: document.getElementById("diagram-desc"),
  previous: document.getElementById("previous-step"),
  next: document.getElementById("next-step")
};

const stepButtons = [...document.querySelectorAll(".step-button")];
const scenes = [...document.querySelectorAll(".scene")];
let currentStep = 0;
let revisionRevealed = false;

function showRevision(revealed) {
  revisionRevealed = revealed;
  elements.revision.classList.toggle("is-revised", revealed);
  elements.revisionAfter.hidden = !revealed;
  elements.revisionButton.setAttribute("aria-expanded", String(revealed));
  elements.revisionButtonLabel.textContent = revealed ? "RESTORE FIRST DRAFT" : "REVISE THE LINE";
}

function showStep(index) {
  if (index < 0 || index >= operations.length || index === currentStep) return;

  currentStep = index;
  const operation = operations[index];
  const number = String(index + 1).padStart(2, "0");

  elements.counter.innerHTML = `${number} <span aria-hidden="true">/</span> 05`;
  elements.verb.textContent = operation.verb;
  elements.title.textContent = operation.title;
  elements.body.textContent = operation.body;
  elements.noteNumber.textContent = number;
  elements.note.textContent = operation.note;
  elements.revision.hidden = index !== 3;
  elements.figureNumber.textContent = number;
  elements.figureLabel.textContent = operation.figure;
  elements.caption.textContent = `${number} / ${operation.caption}`;
  elements.diagramTitle.textContent = operation.figure.toLowerCase();
  elements.diagramDescription.textContent = operation.description;

  stepButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("is-current", active);
    if (active) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });

  scenes.forEach((scene, sceneIndex) => {
    const active = sceneIndex === index;
    scene.classList.toggle("is-active", active);
    scene.setAttribute("aria-hidden", String(!active));
  });

  elements.previous.disabled = index === 0;
  elements.next.disabled = index === operations.length - 1;
}

stepButtons.forEach((button, index) => {
  button.addEventListener("click", () => showStep(index));
});

elements.previous.addEventListener("click", () => showStep(currentStep - 1));
elements.next.addEventListener("click", () => showStep(currentStep + 1));
elements.revisionButton.addEventListener("click", () => showRevision(!revisionRevealed));

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    showStep(currentStep + 1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showStep(currentStep - 1);
  }
});
