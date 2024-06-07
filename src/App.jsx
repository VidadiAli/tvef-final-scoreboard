import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [scoreBoard, setScoreBoard] = useState([]);
  const [juri, setJuri] = useState([]);
  const [countOfJuri, setCountOfJuri] = useState(0);
  const [nameOfJuri, setNameOfJuri] = useState('Juri');
  const [juriCount, setJuriCount] = useState(0);
  const [moveCount, setMoveCount] = useState(-2);
  const [givenPuan, setGivenPuan] = useState([]);
  const [getingCountry, setGetingCountry] = useState([]);
  const [teleCount, setTeleCount] = useState(0);
  const [teleCountConst, setTeleCountConst] = useState(0);

  const [video, setVideo] = useState('');

  const [mainBoxArrayTele, setMainBoxArrayTele] = useState([]);
  const [classOfBack, setClassOfBack] = useState('')

  const [allCountries, setAllCountries] = useState([]);
  const [finalists, setFinalists] = useState([]);


  const colorOfName = [
    {
      video: 'src/videos/x.mp4',
      color1: "red",
      color2: "white",
      color3: "red"
    },
    {
      video: 'src/videos/x.mp4',
      color1: "white",
      color2: "blue",
      color3: "red"
    }
  ]

  const givinPuans = document.getElementsByClassName('givin');
  const totalPuans = document.getElementsByClassName('total');
  const mainBox = document.getElementsByClassName('main-box');



  const callData = async () => {
    const scoreArray = (await axios.get('https://api-esc.onrender.com/country')).data;
    setScoreBoard(scoreArray);

    const allJuri = (await axios.get('https://us-central1-api-tvef-vote.cloudfunctions.net/app/readPuans')).data;
    setJuri(allJuri);


    const arrayOfParticipants = (await axios.get('https://api-esc.onrender.com/country-tele')).data;
    setAllCountries(arrayOfParticipants);

    const arrayOfFinalists = (await axios.get('https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTelePuans')).data;
    setFinalists(arrayOfFinalists);
  };






  const showVotes = () => {
    juri.forEach((e) => {
      if (e.givinCountry === juri[juriCount].givinCountry) {
        givenPuan.push(e.puan)
        setGivenPuan(givenPuan);
        getingCountry.push(e.getingCountry)
        setGetingCountry(getingCountry);
      }
    });


    setClassOfBack('back-ZIndex');

    const givenCountry1 = document.createElement('span');
    givenCountry1.className = 'givin-1'
    givenCountry1.textContent = juri[juriCount].givinCountry.slice(0, juri[juriCount].givinCountry.length / 2);

    const givenCountry2 = document.createElement('span');
    givenCountry2.className = 'givin-2'
    givenCountry2.textContent = juri[juriCount].givinCountry.slice(juri[juriCount].givinCountry.length / 2, juri[juriCount].givinCountry.length);

    document.getElementsByClassName('back')[0].append(givenCountry1, givenCountry2);

    setTimeout(() => {
      givenCountry1.style.top = "50%";
      givenCountry1.style.transform = "translateY(-50%)";

      givenCountry2.style.bottom = "50%";
      givenCountry2.style.transform = "translateY(50%)";
    }, 700)

    setTimeout(() => {
      setClassOfBack('')
      givenCountry1.remove();
      givenCountry2.remove();
    }, 3300)



    givenCountry1.style.backgroundImage = `linear-gradient(45deg, ${colorOfName[Math.floor(moveCount / 2)].color1}, ${colorOfName[Math.floor(moveCount / 2)].color2}, ${colorOfName[Math.floor(moveCount / 2)].color3}, ${colorOfName[Math.floor(moveCount / 2)].color1}, ${colorOfName[Math.floor(moveCount / 2)].color2}, ${colorOfName[Math.floor(moveCount / 2)].color3}, ${colorOfName[Math.floor(moveCount / 2)].color1}, ${colorOfName[Math.floor(moveCount / 2)].color2}, ${colorOfName[Math.floor(moveCount / 2)].color3})`;

    givenCountry2.style.backgroundImage = `linear-gradient(45deg, ${colorOfName[Math.floor(moveCount / 2)].color1}, ${colorOfName[Math.floor(moveCount / 2)].color2}, ${colorOfName[Math.floor(moveCount / 2)].color3}, ${colorOfName[Math.floor(moveCount / 2)].color1}, ${colorOfName[Math.floor(moveCount / 2)].color2}, ${colorOfName[Math.floor(moveCount / 2)].color3}, ${colorOfName[Math.floor(moveCount / 2)].color1}, ${colorOfName[Math.floor(moveCount / 2)].color2}, ${colorOfName[Math.floor(moveCount / 2)].color3})`;


    setVideo("");

  }



  const addJuri = () => {
    setVideo(colorOfName[Math.floor(moveCount / 2)].video);
    console.log(juri)
    setNameOfJuri(juri[juriCount].givinCountry);
    for (let i = 0; i < givinPuans.length; i++) {
      for (let j = 0; j < getingCountry.length; j++) {
        if (givinPuans[i].previousElementSibling.previousElementSibling.textContent === getingCountry[j]) {
          if (givenPuan[j] != 12) {
            givinPuans[i].textContent = givenPuan[j];
            totalPuans[i].textContent = (+totalPuans[i].textContent) + givenPuan[j];
            document.getElementsByClassName('before-element')[i].style.width = "calc(100% - 125px)";
          }
        }
      }
      if (givinPuans[i].textContent != '0') {
        givinPuans[i].style.display = 'inline-block';
      }
    }
    setCountOfJuri(countOfJuri + 1);
  }


  const add12 = () => {
    console.log(getingCountry)
    for (let i = 0; i < givinPuans.length; i++) {
      for (let j = 0; j < getingCountry.length; j++) {
        if (givinPuans[i].previousElementSibling.previousElementSibling.textContent === getingCountry[j]) {
          if (givenPuan[j] == 12) {
            givinPuans[i].textContent = givenPuan[j];
            totalPuans[i].textContent = (+totalPuans[i].textContent) + givenPuan[j];
            document.getElementsByClassName('before-element')[i].style.width = "calc(100% - 140px)";
            document.getElementsByClassName('before-element')[i].classList.add('points-12');
          }
        }
      }
      if (givinPuans[i].textContent != '0') {
        givinPuans[i].style.display = 'inline-block';
      }
    }
  }

  let mainBoxArray = [];
  for (let i = 0; i < mainBox.length; i++) {
    mainBoxArray.push(mainBox[i]);
  }

  const moveBox = () => {
    if (moveCount < 0) {
      let t = 0;
      scoreBoard.forEach((e) => {
        if (e.result) {
          t++;
        }
      })
      console.log(t);
      setTeleCountConst(t + 1);
      setTeleCount(t + 1);
    }

    moveFunc()

    moveElement();

    if (moveCount < ((juri.length / 10) * 2)) {

      if (moveCount % 2 !== 0 && moveCount >= 0) {
        setTimeout(() => {
          for (let i = 0; i < givinPuans.length; i++) {
            givinPuans[i].style.display = 'none';
            givinPuans[i].textContent = '0';
            document.getElementsByClassName('before-element')[i].style.width = "0";
            document.getElementsByClassName('before-element')[i].classList.remove('points-12');
            setGivenPuan([]);
            setGetingCountry([]);
            setJuriCount(juriCount + 10);
          }
        }, 3000)
      }
    }

    if (moveCount >= ((juri.length / 10) * 2)) {
      for (let i = 0; i < givinPuans.length; i++) {
        if (givinPuans[i].textContent != 0 && givinPuans[i].parentElement.style.backgroundColor !== 'rgb(30, 3, 62)') {
          document.getElementsByClassName('before-element')[i].style.width = "calc(100% - 140px)";
          setTimeout(() => {
            givinPuans[i].parentElement.style.backgroundColor = 'rgb(30, 3, 62)';
            givinPuans[i].previousElementSibling.style.backgroundImage = 'linear-gradient(to right, rgb(30, 3, 62), rgb(30, 3, 62))'
            document.getElementsByClassName('before-element')[i].style.width = "0px";
            givinPuans[i].style.display = 'none';
          }, 2000)
        }
      }
    }
    setMoveCount(moveCount + 1);
  }

  useEffect(() => {
    callData();
  }, [])

  let countryPuans = 0, arrayOfCountryPuans = [], arrayOfCountry = [];

  allCountries.forEach((f) => {
    if (f.result) {
      finalists.forEach((e) => {
        if (f.countryName === e.getingCountry) {
          countryPuans += e.puan
        }
      })
      arrayOfCountryPuans.push(countryPuans);
      arrayOfCountry.push(f.countryName);
      countryPuans = 0;
    }
  });



  const tele = () => {
    console.log(teleCount)
    if (teleCount === teleCountConst) {

      moveFunc()

      mainBoxArray.reverse();
      setMainBoxArrayTele(mainBoxArray);
      document.getElementsByClassName('juri-tele')[0].style.display = 'none';
      document.getElementsByClassName('main')[0].style.width = '65%';
    }
    else {
      for (let i = 0; i < mainBoxArrayTele.length; i++) {
        if (mainBoxArrayTele[teleCount - 1].children[2].textContent === arrayOfCountry[i]) {
          mainBoxArrayTele[teleCount - 1].children[4].style.display = 'inline-block';
          mainBoxArrayTele[teleCount - 1].children[4].textContent = arrayOfCountryPuans[i];
          mainBoxArrayTele[teleCount - 1].children[3].textContent = (+mainBoxArrayTele[teleCount - 1].children[3].textContent) + arrayOfCountryPuans[i]
        }
      }
    }
    setTeleCount(teleCount - 1);
  }



  /// repeating function



  const moveFunc = () => {
    let arrayOfJuriTotal = [];

    for (let i = 0; i < totalPuans.length; i++) {
      arrayOfJuriTotal.push(+totalPuans[i].textContent)
    }

    let amount = 0, mainIndex = 0, n = arrayOfJuriTotal.length;

    for (let j = 0; j < arrayOfJuriTotal.length; j++) {
      for (let i = 0; i < n; i++) {
        if (arrayOfJuriTotal[i] > amount) {
          mainIndex = i;
          amount = arrayOfJuriTotal[i];
        }
      }

      let changeElement1 = arrayOfJuriTotal[n - 1]
      arrayOfJuriTotal[n - 1] = arrayOfJuriTotal[mainIndex]
      arrayOfJuriTotal[mainIndex] = changeElement1;

      let changeElement2 = mainBoxArray[n - 1]
      mainBoxArray[n - 1] = mainBoxArray[mainIndex]
      mainBoxArray[mainIndex] = changeElement2;

      n--;

      mainIndex = 0
      amount = 0
    };
  }


  const moveElement = () => {
    console.log(teleCountConst)
    mainBoxArray.reverse()
    let topCount1 = 0, topCount2 = 0;
    for (let i = 0; i < mainBoxArray.length; i++) {
      if (i < Math.ceil(teleCountConst / 2) - 1) {
        mainBoxArray[i].style.top = topCount1 + 'px';
        mainBoxArray[i].style.left = 0 + '%';
        topCount1 += 50;
      }
      else {
        mainBoxArray[i].style.top = topCount2 + 'px';
        mainBoxArray[i].style.left = 51 + '%';
        topCount2 += 50;
      }
    }

    console.log(mainBoxArray, mainBoxArray[0])
  }

  return (
    <>
      <div className={`back ${classOfBack}`}>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
        <div className="back-child"></div>
      </div>
      <section className='main'>
        <div className='scoreboard'>
          {
            scoreBoard && scoreBoard.map((e) => {
              if (e.result) {
                return <div key={e.id} className='main-box'>
                  <div className='before-element'></div>
                  <img src={e.flag} alt="" />
                  <span className='country-name'>{e.countryName}</span>
                  <span className='total'>{0}</span>
                  <span className='givin'>{0}</span>
                </div>
              }
            })
          }
        </div>
        <div className='juri-tele'>
          <video src={`${video}`} autoplay=""></video>
          <div>
            <p>
              <span>{countOfJuri}</span>
              <span> of {(juri.length / 10)} Countries</span>
            </p>
            <span className='name-of-juri'>{nameOfJuri}</span>
          </div>
        </div>
      </section>

      <button onClick={showVotes} className='click click1'>Show</button>
      <button onClick={addJuri} className='click click2'>AddJuri</button>
      <button onClick={add12} className='click click3'>Add12</button>
      <button onClick={moveBox} className='click click4'>Move</button>
      <button onClick={tele} className='click click5'>Tele</button>
    </>
  )
}

export default App
