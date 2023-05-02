// Add event listener to detect when the user opens the browser console
(function() {
  'use strict';

  let previousWidth = window.innerWidth;
  let previousHeight = window.innerHeight;

  const emitEvent = () => {
    //add a document.body.style to set the font color to white
    document.body.style.color = 'white';
    document.body.innerHTML = '<h1>Woah there !</h1><p>What a little detective you are ! Well well, since you have displayed your extreme genius skills by opening the inspect element on this site, You deserve an early access to our <a href="https://chat.whatsapp.com/FQdtfMwU7gf4NCcJjMBPxF">community</a>. Hop on hacker !</p>';
  };

  setInterval(() => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    if (currentWidth !== previousWidth || currentHeight !== previousHeight) {
      emitEvent();
      previousWidth = currentWidth;
      previousHeight = currentHeight;
    }
  }, 500);
})();


$(function () {
  var data = [
    {
      action: "type",
      strings: ["git fetch codecafe"],
      output:
        '<span class="gray">remote: Enumerating objects: 17, done.<br>remote: Counting objects: 100% (17/17), done.<br>remote: Compressing objects: 100% (12/12), done.<br>remote: Total 8 (delta 6), reused 8 (delta 6), pack-reused 0<br>Unpacking objects: 100% (8/8), done.<br>From https://github.com/codecafe/website<br>4b2a27d..a2bc2f3  master     -> codecafe/master</span><br>&nbsp;',
      postDelay: 1000
    },
    {
      action: "type",
      strings: [
        `echo "Welcome to CodeCafe! We've recently gone through some changes and are now an intercity coding club. Our website is currently under construction, but we're excited to share our progress with you soon. Stay tuned!"`
      ],
      output:
        "Welcome to CodeCafe! We've recently gone through some changes and are now an intercity coding club. Our website is currently under construction, but we're excited to share our progress with you soon. Stay tuned!",
      postDelay: 1000
    },
    {
      action: "type",
      //clear: true,
      strings: ['echo "Feeling hacky? Inspect this 🔍"'],
      output: `Feeling hacky? Inspect this 🔍`
    },
    {
      action: "type",
      strings: ["or maybe dont..", ""],
      postDelay: 2000
    }
  ];
  runScripts(data, 0);
});

function runScripts(data, pos) {
  var prompt = $(".prompt"),
    script = data[pos];
  if (script.clear === true) {
    $(".history").html("");
  }
  switch (script.action) {
    case "type":
      // cleanup for next execution
      prompt.removeData();
      $(".typed-cursor").text("");
      prompt.typed({
        strings: script.strings,
        typeSpeed: 30,
        callback: function () {
          var history = $(".history").html();
          history = history ? [history] : [];
          history.push("$ " + prompt.text());
          if (script.output) {
            history.push(script.output);
            prompt.html("");
            $(".history").html(history.join("<br>"));
          }
          // scroll to bottom of screen
          $("section.terminal").scrollTop($("section.terminal").height());
          // Run next script
          pos++;
          if (pos < data.length) {
            setTimeout(function () {
              runScripts(data, pos);
            }, script.postDelay || 1000);
          }
        }
      });
      break;
    case "view":
      break;
  }
}