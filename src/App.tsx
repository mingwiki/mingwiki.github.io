import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
  const [suggestions, setSuggestions] = useState<Array<object>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchValueRef = useRef<string>(null);
  const $ = (el: string) => document.querySelector(el);

  const initLocalClocks = () => {
    // Get the local time using JS
    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    // Create an object with each hand and it's angle in degrees
    let hands = [
      {
        hand: "hours",
        angle: hours * 30 + minutes / 2,
      },
      {
        hand: "minutes",
        angle: minutes * 6,
      },
      {
        hand: "seconds",
        angle: seconds * 6,
      },
    ];
    // Loop through each of these hands to set their angle
    for (let j = 0; j < hands.length; j++) {
      let elements = document.querySelectorAll<HTMLElement>(
        "." + hands[j].hand,
      );
      for (let k = 0; k < elements.length; k++) {
        elements[k].style.webkitTransform = "rotateZ(" + hands[j].angle +
          "deg)";
        elements[k].style.transform = "rotateZ(" + hands[j].angle + "deg)";
        // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === "minutes") {
          (elements[k].parentNode as Element).setAttribute(
            "data-second-angle",
            String(hands[j + 1].angle),
          );
        }
      }
    }
  };
  const handleKeydown = (e: KeyboardEvent): void => {
    document.activeElement !== searchRef.current && searchRef.current.focus();
    const value = encodeURIComponent(searchValueRef.current);
    let url = "";
    if (e.key === "Enter") {
      url = `https://google.com/search?q=${value}&pws=0&gl=us&gws_rd=cr`;
    }
    if (e.ctrlKey && e.key === "Enter") {
      url =
        `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${value}`;
    }
    if (e.shiftKey && e.key === "Enter") {
      url = `https://github.com/search?q=${value}`;
    }
    if (url) {
      open(url, "_blank");
      return;
    }
    handleSuggestions();
  };
  const jsonp = (url: string) => {
    const script = document.createElement("script");
    script.src = url;
    $("head")?.appendChild(script);
    $("head")?.removeChild(script);
  };
  const handleSuggestions = (): void => {
    const callback: string = "autocompleteCallback";
    window[callback] = (res: Array<any>) => setSuggestions(res[1]);
    const suggestEngine = {
      google: "https://www.google.com/complete/search?client=chrome&hl=en",
      duckduckgo: "https://duckduckgo.com/ac?",
    };
    jsonp(
      `${suggestEngine.google}&q=${searchValueRef.current}&callback=${callback}`,
    );
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    initLocalClocks();
  }, []);
  return (
    <div className="App">
      <article className="clock simple">
        <div className="hours-container">
          <div className="hours"></div>
        </div>
        <div className="minutes-container">
          <div className="minutes"></div>
        </div>
        <div className="seconds-container">
          <div className="seconds"></div>
        </div>
      </article>
      <input
        ref={searchRef}
        type="text"
        aria-label="search"
        onInput={(e: FormEvent<HTMLInputElement>) => {
          searchValueRef.current = (e.target as HTMLInputElement).value;
        }}
      />
      <div>
        {searchValueRef.current &&
          suggestions.map((i, idx) => <div key={idx}>{i}</div>)}
      </div>
    </div>
  );
}

export default App;
