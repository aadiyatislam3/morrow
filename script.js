(function () {
  'use strict';
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  var statistics = [
    {
      value: '1 in 7',
      text: 'adolescents aged 10-19 experience a mental health condition globally',
      source: 'WHO, updated 1 September 2025',
      url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health'
    },
    {
      value: '15%',
      text: 'of the global burden of disease is accounted for by mental health conditions among 10-19-year-olds',
      source: 'WHO, updated 1 September 2025',
      url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health'
    },
    {
      value: '4.1% / 5.3%',
      text: 'of 10-14-year-olds / 15-19-year-olds are estimated to experience an anxiety disorder',
      source: 'WHO, updated 1 September 2025',
      url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health'
    },
    {
      value: '1.3% / 3.4%',
      text: 'of 10-14-year-olds / 15-19-year-olds are estimated to experience a depressive disorder',
      source: 'WHO, updated 1 September 2025',
      url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health'
    },
    {
      value: '3rd',
      text: 'leading cause of death among people aged 15-29, according to WHO',
      source: 'WHO, updated 28 August 2026',
      url: 'https://www.who.int/news-room/fact-sheets/detail/suicide'
    },
    {
      value: '>90%',
      text: 'of people in Bangladesh who need mental health care do not receive treatment; the source does not define this as adolescents',
      source: 'WHO Bangladesh, published 24 August 2026',
      url: 'https://www.who.int/bangladesh/news/feature-stories/item/breaking-the-silence--bangladesh-schools-act-on-mental-health-through-who-s-live-life-initiative'
    },
    {
      value: '26.5%',
      text: 'of 563 school-going students aged 13-18 in selected Dhaka schools screened at moderate-to-severe depression levels',
      source: 'PLOS ONE, 2021; Dhaka sample, not national',
      url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0247898'
    },
    {
      value: '18.1%',
      text: 'of the same selected Dhaka school sample screened at moderate-to-severe anxiety levels',
      source: 'PLOS ONE, 2021; Dhaka sample, not national',
      url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0247898'
    }
  ];
  var statisticsGrid = document.querySelector('[data-statistics]');
  if (statisticsGrid) {
    statistics.forEach(function (stat) {
      var card = document.createElement('article');
      card.className = 'card stat-card';
      card.innerHTML = '<div class="stat-number">' + stat.value + '</div><p>' + stat.text + '</p><small>Source: <a href="' + stat.url + '" target="_blank" rel="noopener">' + stat.source + '</a></small>';
      statisticsGrid.appendChild(card);
    });
  }

  var quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;

  var questions = [
    { area: 'mood', label: 'Mood', text: 'How has your overall mood felt recently?' },
    { area: 'sleep', label: 'Sleep', text: 'How have you been sleeping recently?' },
    { area: 'enjoyment', label: 'Interest and enjoyment', text: 'How much have you enjoyed things you usually like?' },
    { area: 'stress', label: 'Stress and worry', text: 'How manageable have stress or worry felt?' },
    { area: 'connection', label: 'Social connection', text: 'How connected have you felt to people who matter to you?' }
  ];
  var choices = [
    { label: 'Very well', level: 0 }, { label: 'Mostly okay', level: 1 },
    { label: 'Some difficulty', level: 2 }, { label: 'A lot of difficulty', level: 3 }
  ];
  var suggestions = {
    mood: ['Keep a manageable daily routine, even if it is small.', 'Spend a little time doing something you normally enjoy.', 'Speak with someone you trust about how things have felt.'],
    sleep: ['Try keeping a consistent sleep and wake time.', 'Create a short wind-down routine before bed.', 'Reduce stimulating activities close to bedtime.'],
    enjoyment: ['Start with one small, enjoyable activity rather than expecting a big change.', 'Give yourself permission to take things one step at a time.', 'Stay connected with supportive people while you rebuild energy.'],
    stress: ['Break large tasks into smaller next steps.', 'Take short pauses between demanding activities.', 'Try slow breathing, and talk to someone if pressure feels difficult to manage.'],
    connection: ['Message or spend time with someone you trust.', 'Choose a low-pressure way to be around supportive people.', 'Consider speaking with a counsellor or trusted adult if disconnection continues.']
  };
  var answers = [];
  var current = 0;
  var start = quiz.querySelector('[data-start]');
  var form = quiz.querySelector('[data-quiz-form]');
  var result = quiz.querySelector('[data-results]');
  var questionView = quiz.querySelector('[data-question-view]');
  var progress = quiz.querySelector('[data-progress]');
  var progressText = quiz.querySelector('[data-progress-text]');
  var error = quiz.querySelector('[data-error]');

  function renderQuestion() {
    var q = questions[current];
    progress.style.width = ((current + 1) / questions.length * 100) + '%';
    progressText.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
    progress.setAttribute('aria-valuenow', String(current + 1));
    questionView.innerHTML = '<div class="question-kicker">' + q.label + '</div><h2 class="question-title">' + q.text + '</h2><div class="answers" role="group" aria-label="Choose one answer"></div>';
    var list = questionView.querySelector('.answers');
    choices.forEach(function (choice, index) {
      var button = document.createElement('button');
      button.type = 'button'; button.className = 'answer-option'; button.setAttribute('aria-pressed', answers[current] === index ? 'true' : 'false');
      button.innerHTML = '<span class="answer-dot" aria-hidden="true"></span><span>' + choice.label + '</span>';
      button.addEventListener('click', function () {
        answers[current] = index;
        Array.prototype.forEach.call(list.children, function (item) { item.setAttribute('aria-pressed', 'false'); });
        button.setAttribute('aria-pressed', 'true'); error.textContent = '';
      });
      list.appendChild(button);
    });
    questionView.querySelector('.answer-option').focus();
    quiz.querySelector('[data-back]').disabled = current === 0;
    quiz.querySelector('[data-next]').textContent = current === questions.length - 1 ? 'See my reflections' : 'Next';
  }
  function showStep(step) { quiz.querySelector('[data-intro]').hidden = step !== 'intro'; form.hidden = step !== 'questions'; result.hidden = step !== 'results'; }
  start.addEventListener('click', function () { answers = []; current = 0; showStep('questions'); renderQuestion(); });
  quiz.querySelector('[data-back]').addEventListener('click', function () { if (current > 0) { current--; renderQuestion(); } });
  quiz.querySelector('[data-next]').addEventListener('click', function () {
    if (typeof answers[current] !== 'number') { error.textContent = 'Choose an answer before continuing.'; return; }
    if (current < questions.length - 1) { current++; renderQuestion(); } else { renderResults(); }
  });
  function renderResults() {
    var scored = questions.map(function (q, i) { return { area: q.area, label: q.label, level: answers[i] || 0 }; }).sort(function (a, b) { return b.level - a.level; });
    var highest = scored[0].level;
    var focus = scored.filter(function (item) { return item.level === highest && highest >= 2; }).slice(0, 2);
    if (!focus.length) focus = scored.slice(0, 2);
    var names = focus.map(function (item) { return item.label.toLowerCase(); });
    var summary = highest < 2 ? 'Your answers suggest that things are feeling fairly manageable right now. Keep noticing what supports you, and remember that a check-in can change from day to day.' : (names.length > 1 ? names[0].replace(/^./, function (c) { return c.toUpperCase(); }) + ' and ' + names[1] + ' seem to be the areas affecting you most right now.' : names[0].replace(/^./, function (c) { return c.toUpperCase(); }) + ' seems to be an area worth paying attention to right now.');
    quiz.querySelector('[data-summary]').textContent = summary;
    var grid = quiz.querySelector('[data-suggestion-grid]'); grid.innerHTML = '';
    focus.forEach(function (item) {
      var card = document.createElement('article'); card.className = 'suggestion-card';
      card.innerHTML = '<h3>' + item.label + '</h3><ul>' + suggestions[item.area].map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul><p><a href="learn.html#' + item.area + '">Learn more about ' + item.label.toLowerCase() + '</a></p>';
      grid.appendChild(card);
    });
    showStep('results'); result.querySelector('h2').focus();
  }
  quiz.querySelector('[data-reset]').addEventListener('click', function () { answers = []; current = 0; showStep('intro'); start.focus(); });

  var breath = quiz.querySelector('[data-breathing]');
  if (breath) {
    var circle = breath.querySelector('.breath-circle'), instruction = breath.querySelector('[data-breath-instruction]'), timer = breath.querySelector('[data-breath-timer]'), interval, seconds;
    breath.querySelector('[data-breath-start]').addEventListener('click', function () {
      if (interval) return; seconds = 60; circle.classList.add('breathing'); timer.textContent = '60 seconds'; instruction.textContent = 'Breathe in slowly, then breathe out slowly.';
      interval = setInterval(function () { seconds--; timer.textContent = seconds + ' seconds'; instruction.textContent = seconds % 8 < 4 ? 'Breathe in gently.' : 'Breathe out slowly.'; if (seconds <= 0) stopBreathing('You completed one minute. Notice how you feel.'); }, 1000);
    });
    function stopBreathing(message) { clearInterval(interval); interval = null; circle.classList.remove('breathing'); instruction.textContent = message; timer.textContent = 'Ready when you are'; }
    breath.querySelector('[data-breath-stop]').addEventListener('click', function () { stopBreathing('Paused. You can start again whenever you like.'); });
  }
}());
