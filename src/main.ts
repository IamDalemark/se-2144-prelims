let output: string = "";
let isOn: boolean = false;


const helloButton = document.querySelector("#but-hello");
const acButton = document.querySelector("#but-ac");
const byeButton = document.querySelector("#but-bye");
const equalButton = document.querySelector("#but-equal");
const delButton = document.querySelector("#but-del");
const numberButtons = document.querySelectorAll(".number");
const hello_lst: string[] = ["Ciao", "Bonjour", "Guten Tag", "Salve", "Hola", "Ahoj"]
const hello_lst_last_char: string[] = ["o", "r", "g", "e", "a", "j", 'i', 'n', 'f', 't', 'y', "N",];

function ShowResult() {
  document.getElementById("screen")!.innerHTML = output;
}



function hello() {
  if (helloButton) {
    helloButton.addEventListener("click", () => {
      if (isOn === false) return
      output = hello_lst[Math.floor(Math.random() * hello_lst.length)]
      ShowResult();
    });
  }
}

function AC() {
  if (acButton) {
    acButton.addEventListener("click", () => {
      isOn = true;
      output = "0";
      ShowResult();
      output = "";
    });
  }
}

function del() {
  if (delButton) {
    delButton!.addEventListener("click", () => {
      if (isOn === false) return
      const char = output.charAt(output.length - 1);
      if (hello_lst_last_char.includes(char)) {
        output = ""
      }
      else if (output.length >= 1) {
        output = output.slice(0, -1);
        console.log(output);
      }
      ShowResult();
    })
  }
}

function bye() {
  if (byeButton) {
    byeButton.addEventListener("click", () => {
      if (isOn === false) return
      output = "GoodBye";
      isOn = false;
      console.log(isOn);
      ShowResult();
      setTimeout(() => {
        output = ":(";
        ShowResult()
      }, 1000);
      setTimeout(() => {
        output = "";
        ShowResult();
      }, 2000);
    });
  }
}


function handleNumberClick(n: string) {
  const char = output.charAt(output.length - 1);
  console.log("x" + char);
  if (isOn === false) return
  if (output.length >= 8) return
  if (hello_lst_last_char.includes(char)) {
    output = n;
  } else {
    output += n;
  }
  ShowResult();
}

// event listeners to number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    if (number) {
      handleNumberClick(number);
    }
  });
});


function noDoubleOperators(): boolean {
  const operators: string[] = ["+", "-", "/", "*", "."];
  const operators_no_minus: string[] = ["+", "/", "*", "."];
  for (let i = 0; i < output.length - 1; i++) {
    if (operators.includes(output[i]) && operators_no_minus.includes(output[i + 1])) {
      console.log("found double");
      return false;
    } else if (output[i] === "-" && output[i + 1] === "-") {
      return false;
    }


  }
  console.log("found none");
  return true;
}


function calculate() {
  if (equalButton) {
    console.log("calculate pressed")
    equalButton!.addEventListener("click", () => {
      if (isOn === false) return
      if (output.length === 0) return
      if (noDoubleOperators()) {
        let result = eval(output);
        if (result % 1 !== 0) {
          result = result.toFixed(2)
        }
        console.log(result + "evaluated")
        output = result;
        output = output.toString();
        ShowResult();
      } else {
        output = "Error";
        // document.querySelector(".app")
        console.log(output);
        ShowResult();
        output = "";
      }
    }
    )
  }
}

AC();
bye();
hello();
del();
calculate();