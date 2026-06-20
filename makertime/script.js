let state = {
  unit: 'C',
  lang: 'uk',
  windUnit: 'kmh',
  currentLat: 50.45,
  currentLon: 30.52,
  currentCity: 'Kyiv',
};

const i18n = {
  uk: {
    appTitle:'Weather App', settings:'Налаштування', units:'Одиниці температури',
    language:'Мова', wind:'Вітер', feelsLike:'Відчувається', humidity:'Вологість',
    uv:'УФ індекс', sunrise:'Схід сонця', sunset:'Захід сонця',
    todayDetail:'Детальний прогноз на сьогодні', week7:'Прогноз на 7 днів',
    searchPlaceholder:'Введіть місто...',
    days:['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
    today:'Сьогодні', now:'Зараз',
    weatherLabels:{
      0:'Чисте небо',1:'Переважно ясно',2:'Частково хмарно',3:'Похмуро',
      45:'Туман',48:'Паморозна імла',51:'Слабка морось',53:'Помірна морось',
      55:'Сильна морось',61:'Слабкий дощ',63:'Помірний дощ',65:'Сильний дощ',
      71:'Слабкий сніг',73:'Помірний сніг',75:'Сильний сніг',
      80:'Зливи',81:'Рясні зливи',82:'Шторм',85:'Снігові шквали',
      86:'Сильні снігові шквали',95:'Гроза',96:'Гроза з градом',99:'Сильна гроза'
    },
    badgeLabels:{
      sun:'Ясно',night:'Ясна ніч',partCloud:'Невелика хмарність',
      cloud:'Хмарно',fog:'Туман',rain:'Дощ',snow:'Сніг',storm:'Гроза',windy:'Вітряно'
    }
  },
  en: {
    appTitle:'Weather App', settings:'Settings', units:'Temperature units',
    language:'Language', wind:'Wind', feelsLike:'Feels like', humidity:'Humidity',
    uv:'UV Index', sunrise:'Sunrise', sunset:'Sunset',
    todayDetail:"Today's detailed forecast", week7:'7-day forecast',
    searchPlaceholder:'Enter city...',
    days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    today:'Today', now:'Now',
    weatherLabels:{
      0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',
      45:'Fog',48:'Icy fog',51:'Light drizzle',53:'Moderate drizzle',
      55:'Dense drizzle',61:'Light rain',63:'Moderate rain',65:'Heavy rain',
      71:'Light snow',73:'Moderate snow',75:'Heavy snow',
      80:'Rain showers',81:'Heavy showers',82:'Storm',85:'Snow showers',
      86:'Heavy snow showers',95:'Thunderstorm',96:'Thunderstorm + hail',99:'Heavy thunderstorm'
    },
    badgeLabels:{
      sun:'Clear',night:'Clear night',partCloud:'Partly cloudy',
      cloud:'Cloudy',fog:'Fog',rain:'Rain',snow:'Snow',storm:'Storm',windy:'Windy'
    }
  },
  ru: {
    appTitle:'Погода', settings:'Настройки', units:'Единицы температуры',
    language:'Язык', wind:'Ветер', feelsLike:'Ощущается', humidity:'Влажность',
    uv:'УФ индекс', sunrise:'Восход', sunset:'Закат',
    todayDetail:'Подробный прогноз на сегодня', week7:'Прогноз на 7 дней',
    searchPlaceholder:'Введите город...',
    days:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    today:'Сегодня', now:'Сейчас',
    weatherLabels:{
      0:'Ясно',1:'Преимущественно ясно',2:'Переменная облачность',3:'Пасмурно',
      45:'Туман',48:'Изморозь',51:'Слабая морось',53:'Умеренная морось',
      55:'Сильная морось',61:'Небольшой дождь',63:'Умеренный дождь',65:'Сильный дождь',
      71:'Небольшой снег',73:'Умеренный снег',75:'Сильный снег',
      80:'Ливень',81:'Сильный ливень',82:'Шторм',85:'Снежные шквалы',
      86:'Сильные снежные шквалы',95:'Гроза',96:'Гроза с градом',99:'Сильная гроза'
    },
    badgeLabels:{
      sun:'Ясно',night:'Ясная ночь',partCloud:'Небольшая облачность',
      cloud:'Облачно',fog:'Туман',rain:'Дождь',snow:'Снег',storm:'Гроза',windy:'Ветрено'
    }
  }
};

function t(key){ return i18n[state.lang][key] || key; }
function tw(code){ return (i18n[state.lang].weatherLabels||{})[code] || ''; }
function tb(key){ return (i18n[state.lang].badgeLabels||{})[key] || key; }

function convertTemp(c){
  if(state.unit === 'F') return Math.round(c * 9/5 + 32);
  if(state.unit === 'K') return Math.round(c + 273.15);
  return Math.round(c);
}
function unitLabel(){ return state.unit === 'F' ? '°F' : state.unit === 'K' ? 'K' : '°C'; }

function convertWind(kmh){
  if(state.windUnit === 'ms') return Math.round(kmh / 3.6);
  if(state.windUnit === 'mph') return Math.round(kmh * 0.621);
  return Math.round(kmh);
}
function windLabel(){ return state.windUnit === 'ms' ? 'm/s' : state.windUnit === 'mph' ? 'mph' : 'km/h'; }

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const suggestionsBox = document.getElementById('suggestions');
const cityEl = document.getElementById('city');
const cityDateEl = document.getElementById('cityDate');
const tempEl = document.getElementById('tempVal');
const tempUnitEl = document.getElementById('tempUnit');
const descEl = document.getElementById('desc');
const descSub = document.getElementById('descSub');
const windEl = document.getElementById('wind');
const windUnitEl = document.getElementById('windUnit');
const feelsEl = document.getElementById('feelsLike');
const feelsUnitEl = document.getElementById('feelsUnit');
const humidityEl = document.getElementById('humidity');
const uvEl = document.getElementById('uvIndex');
const iconEl = document.getElementById('weatherIcon');
const skyCanvas = document.getElementById('skyCanvas');
const loadingOverlay = document.getElementById('loadingOverlay');
const sunEl = document.getElementById('sun');
const sunRaysEl = document.getElementById('sunRays');
const moonEl = document.getElementById('moon');
const starsEl = document.getElementById('stars');
const lightningContainer = document.getElementById('lightningContainer');
const sunriseEl = document.getElementById('sunriseTime');
const sunsetEl = document.getElementById('sunsetTime');
const arcFillEl = document.getElementById('arcFill');
const arcDotEl = document.getElementById('arcDot');
const hourlyScrollEl = document.getElementById('hourlyScroll');
const forecastGridEl = document.getElementById('forecastGrid');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsClose = document.getElementById('settingsClose');
const settingsOverlay = document.getElementById('settingsOverlay');

const clouds = [
  document.getElementById('cloud1'), document.getElementById('cloud2'),
  document.getElementById('cloud3'), document.getElementById('cloud4'),
  document.getElementById('cloud5'),
];

let lastRequest = 0;
let particles = [];
let cachedData = null;

(function(){
  for(let i=0;i<40;i++){
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*60+'%';
    s.style.animationDelay = Math.random()*3+'s';
    s.style.animationDuration = (1.5+Math.random()*2)+'s';
    const sz=(1+Math.random()*3)+'px'; s.style.width=sz; s.style.height=sz;
    starsEl.appendChild(s);
  }
})();

function clearParticles(){ particles.forEach(p=>p&&p.remove()); particles=[]; }

function createRain(heavy=false){
  clearParticles();
  const count=heavy?80:45;
  for(let i=0;i<count;i++){
    const d=document.createElement('div'); d.className='raindrop';
    d.style.left=Math.random()*110-5+'%';
    d.style.height=(heavy?20+Math.random()*20:12+Math.random()*12)+'px';
    d.style.animationDuration=(0.4+Math.random()*0.5)+'s';
    d.style.animationDelay=Math.random()*1.5+'s';
    skyCanvas.appendChild(d); particles.push(d);
  }
}
function createSnow(){
  clearParticles();
  const flakes=['❄','❅','❆','✦','·','*','＊'];
  for(let i=0;i<35;i++){
    const f=document.createElement('div'); f.className='snowflake';
    f.textContent=flakes[Math.floor(Math.random()*flakes.length)];
    f.style.left=Math.random()*105-2+'%';
    f.style.fontSize=(10+Math.random()*12)+'px';
    f.style.animationDuration=(4+Math.random()*6)+'s';
    f.style.animationDelay=Math.random()*6+'s';
    skyCanvas.appendChild(f); particles.push(f);
  }
}
function createFog(){
  clearParticles();
  for(let i=0;i<5;i++){
    const f=document.createElement('div'); f.className='fog-layer';
    f.style.top=(10+i*18)+'%';
    f.style.opacity=(0.15+Math.random()*0.2)+'';
    f.style.animationDuration=(25+i*8)+'s';
    f.style.animationDirection=i%2?'reverse':'normal';
    skyCanvas.appendChild(f); particles.push(f);
  }
}
function createLightning(){
  lightningContainer.innerHTML='';
  function bolt(){
    const b=document.createElement('div'); b.className='lightning-bolt';
    b.style.left=(20+Math.random()*60)+'%'; b.style.top=(5+Math.random()*25)+'%';
    b.style.height=(100+Math.random()*80)+'px';
    b.style.animation=`lightningFlash ${3+Math.random()*4}s ${Math.random()*6}s infinite`;
    lightningContainer.appendChild(b);
  }
  for(let i=0;i<4;i++) bolt();
}

function showClouds(count,dark=false){
  clouds.forEach((c,i)=>{
    if(i<count){
      c.classList.add('visible');
      const fill=dark?(i<2?'rgba(120,140,160,0.85)':'rgba(150,165,180,0.8)'):'white';
      c.querySelectorAll('ellipse').forEach(e=>e.setAttribute('fill',fill));
    } else { c.classList.remove('visible'); }
  });
}

function setSky(theme){
  sunEl.classList.toggle('visible', theme==='theme-sun');
  sunRaysEl.classList.toggle('visible', theme==='theme-sun');
  moonEl.classList.toggle('visible', theme==='theme-night'||theme==='theme-storm');
  starsEl.classList.toggle('visible', theme==='theme-night'||theme==='theme-storm');
  clearParticles(); lightningContainer.innerHTML='';
  switch(theme){
    case 'theme-sun':   showClouds(0); break;
    case 'theme-cloud': showClouds(4); break;
    case 'theme-rain':  showClouds(4,true); createRain(); break;
    case 'theme-snow':  showClouds(3); createSnow(); break;
    case 'theme-fog':   showClouds(3); createFog(); break;
    case 'theme-storm': showClouds(5,true); createRain(true); createLightning(); break;
    case 'theme-windy': showClouds(3); break;
    default:            showClouds(2);
  }
}

function getIconClass(code, wind, isNight){
  if(wind>25)               return 'fas fa-wind';
  if(code===0 && isNight)   return 'fas fa-moon';
  if(code===0)              return 'fas fa-sun';
  if([1].includes(code))    return 'fas fa-sun';
  if([2].includes(code))    return 'fas fa-cloud-sun';
  if([3].includes(code))    return 'fas fa-cloud';
  if([45,48].includes(code))return 'fas fa-smog';
  if([51,53,55,61,63,65,80,81,82].includes(code)) return 'fas fa-cloud-rain';
  if([71,73,75,85,86].includes(code)) return 'fas fa-snowflake';
  if([95,96,99].includes(code))       return 'fas fa-bolt';
  return 'fas fa-cloud';
}

function getSmallIcon(code, isNight){
  if(code===0 && isNight)   return 'fas fa-moon';
  if(code===0)              return 'fas fa-sun';
  if([1].includes(code))    return 'fas fa-sun';
  if([2].includes(code))    return 'fas fa-cloud-sun';
  if([3].includes(code))    return 'fas fa-cloud';
  if([45,48].includes(code))return 'fas fa-smog';
  if([51,53,55,61,63,65,80,81,82].includes(code)) return 'fas fa-cloud-rain';
  if([71,73,75,85,86].includes(code)) return 'fas fa-snowflake';
  if([95,96,99].includes(code))       return 'fas fa-bolt';
  return 'fas fa-cloud';
}

function applyTheme(code, wind, isNight){
  document.body.className='';
  let theme, badgeKey, sub;
  if(isNight && code===0)       { theme='theme-night'; badgeKey='night'; sub=tw(0); }
  else if(wind>25)              { theme='theme-windy'; badgeKey='windy'; sub=windLabel()+' '+convertWind(wind)+' '+windLabel(); }
  else if(code===0)             { theme='theme-sun';   badgeKey='sun';   sub=tw(0); }
  else if([1,2].includes(code)) { theme='theme-cloud'; badgeKey='partCloud'; sub=tw(code); }
  else if([3].includes(code))   { theme='theme-cloud'; badgeKey='cloud'; sub=tw(code); }
  else if([45,48].includes(code)){ theme='theme-fog';  badgeKey='fog';   sub=tw(code); }
  else if([51,53,55,61,63,65,80,81,82].includes(code)){ theme='theme-rain'; badgeKey='rain'; sub=tw(code); }
  else if([71,73,75,85,86].includes(code)){ theme='theme-snow'; badgeKey='snow'; sub=tw(code); }
  else if([95,96,99].includes(code)){ theme='theme-storm'; badgeKey='storm'; sub=tw(code); }
  else { theme='theme-cloud'; badgeKey='cloud'; sub=tw(code)||'—'; }
  document.body.classList.add(theme);
  descEl.textContent = tb(badgeKey);
  descSub.textContent = sub;
  setSky(theme);
}

function parseSunTime(iso){
  if(!iso) return null;
  const d = new Date(iso);
  return d.getHours()*60 + d.getMinutes();
}
function fmtTime(iso){
  if(!iso) return '--:--';
  const d=new Date(iso);
  return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
}
function updateSunArc(sunriseIso, sunsetIso){
  sunriseEl.textContent = fmtTime(sunriseIso);
  sunsetEl.textContent  = fmtTime(sunsetIso);
  const now  = new Date();
  const nowMin = now.getHours()*60+now.getMinutes();
  const riseMin = parseSunTime(sunriseIso);
  const setMin  = parseSunTime(sunsetIso);
  if(!riseMin||!setMin) return;
  const total = setMin - riseMin;
  const elapsed = Math.max(0, Math.min(total, nowMin - riseMin));
  const pct = total > 0 ? (elapsed/total)*100 : 50;
  arcFillEl.style.width = pct+'%';
  arcDotEl.style.left   = pct+'%';
}

function renderHourly(data){
  const times  = data.hourly.time;
  const temps  = data.hourly.temperature_2m;
  const codes  = data.hourly.weathercode;
  const precip = data.hourly.precipitation_probability;
  const now = new Date();
  const nowH = now.getHours();

  const todayStr = now.toISOString().slice(0,10);
  let startIdx = times.findIndex(t => t.startsWith(todayStr) && parseInt(t.slice(11,13)) >= nowH);
  if(startIdx < 0) startIdx = 0;

  const html = [];
  for(let i=startIdx; i<Math.min(startIdx+24, times.length); i++){
    const hr = parseInt(times[i].slice(11,13));
    const isCurrent = i===startIdx;
    const isNightHr = hr<6||hr>=21;
    const timeLabel = isCurrent ? t('now') : hr.toString().padStart(2,'0')+':00';
    const cls = getSmallIcon(codes[i], isNightHr);
    const rainPct = precip ? precip[i] : 0;
    html.push(`
      <div class="hour-item${isCurrent?' now':''}">
        <div class="hour-time">${timeLabel}</div>
        <i class="${cls} hour-icon"></i>
        <div class="hour-temp">${convertTemp(temps[i])}${unitLabel()}</div>
        ${rainPct>5?`<div class="hour-rain"><i class="fas fa-tint" style="font-size:8px"></i> ${rainPct}%</div>`:'<div class="hour-rain" style="opacity:0">0%</div>'}
      </div>`);
  }
  hourlyScrollEl.innerHTML = html.join('');
}

function renderForecast(data){
  const dates   = data.daily.time;
  const maxT    = data.daily.temperature_2m_max;
  const minT    = data.daily.temperature_2m_min;
  const codes   = data.daily.weathercode;
  const precip  = data.daily.precipitation_probability_max;

  const todayStr = new Date().toISOString().slice(0,10);
  const days = t('days');

  const first4 = [], next3 = [];
  dates.slice(0,7).forEach((dateStr, i) => {
    const d   = new Date(dateStr+'T12:00:00');
    const dow  = i===0 ? t('today') : days[d.getDay()];
    const icon = getSmallIcon(codes[i], false);
    const rain = precip ? precip[i] : 0;
    const html = `
      <div class="forecast-day${i===0?' today':''}">
        <div class="forecast-dow">${dow}</div>
        <i class="${icon} forecast-icon"></i>
        <div class="forecast-temps">
          <span class="f-max">${convertTemp(maxT[i])}°</span>
          <span class="f-min">${convertTemp(minT[i])}°</span>
        </div>
        ${rain>10?`<div class="forecast-rain"><i class="fas fa-tint" style="font-size:8px"></i> ${rain}%</div>`:''}
      </div>`;
    if(i<4) first4.push(html); else next3.push(html);
  });

  forecastGridEl.innerHTML = `
    <div class="forecast-row-top">
      ${first4.join('')}
    </div>

    <div class="forecast-row-bottom">
      ${next3.join('')}
    </div>
  `;
}

async function getWeather(city, lat=null, lon=null){
  const reqId = ++lastRequest;
  loadingOverlay.classList.add('show');
  try {
    if(!lat||!lon){
      const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=${state.lang}`);
      const g = await geo.json();
      if(!g.results||!g.results.length){ descSub.textContent='Місто не знайдено'; return; }
      lat=g.results[0].latitude; lon=g.results[0].longitude; city=g.results[0].name;
    }
    state.currentLat=lat; state.currentLon=lon; state.currentCity=city;

    const url = `https://api.open-meteo.com/v1/forecast`+
      `?latitude=${lat}&longitude=${lon}`+
      `&current_weather=true`+
      `&hourly=temperature_2m,weathercode,precipitation_probability,relativehumidity_2m,apparent_temperature`+
      `&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max`+
      `&timezone=auto&forecast_days=8`;

    const res = await fetch(url);
    const data = await res.json();
    if(reqId!==lastRequest) return;
    if(!data.current_weather) throw new Error('No data');

    cachedData = data;
    renderAll(data, city);

  } catch(err){
    console.error(err);
    descSub.textContent='Помилка отримання даних';
  } finally {
    loadingOverlay.classList.remove('show');
  }
}

function renderAll(data, city){
  const w = data.current_weather;
  const nowHourIdx = (() => {
    const nowISO = new Date().toISOString().slice(0,13);
    return data.hourly.time.findIndex(t=>t.startsWith(nowISO));
  })();
  const humidity = nowHourIdx>=0 ? data.hourly.relativehumidity_2m[nowHourIdx] : '--';
  const feelsLike = nowHourIdx>=0 ? data.hourly.apparent_temperature[nowHourIdx] : w.temperature;
  const uvMax = data.daily?.uv_index_max?.[0] ?? '--';

  cityEl.textContent = city;
  cityDateEl.textContent = new Date().toLocaleDateString(state.lang==='en'?'en-GB':state.lang==='ru'?'ru-RU':'uk-UA',{weekday:'long',day:'numeric',month:'long'});
  tempEl.textContent = convertTemp(w.temperature);
  tempUnitEl.textContent = unitLabel();
  windEl.textContent = convertWind(w.windspeed);
  windUnitEl.textContent = windLabel();
  feelsEl.textContent = convertTemp(feelsLike);
  feelsUnitEl.textContent = unitLabel();
  humidityEl.textContent = typeof humidity==='number'?Math.round(humidity):'--';
  uvEl.textContent = typeof uvMax==='number'?uvMax.toFixed(1):'--';

  const hour = new Date().getHours();
  const isNight = hour<6||hour>=21;
  iconEl.innerHTML = `<i class="${getIconClass(w.weathercode, w.windspeed, isNight)} fa-3x"></i>`;

  applyTheme(w.weathercode, w.windspeed, isNight);

  const sunrise = data.daily?.sunrise?.[0];
  const sunset  = data.daily?.sunset?.[0];
  updateSunArc(sunrise, sunset);

  renderHourly(data);
  renderForecast(data);

  applyI18n();
}

function rerender(){
  if(!cachedData) return;
  renderAll(cachedData, state.currentCity);
}

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  cityInput.placeholder = t('searchPlaceholder');
}

settingsBtn.onclick = () => {
  settingsPanel.classList.add('open');
  settingsOverlay.classList.add('show');
};
settingsClose.onclick = closeSettings;
settingsOverlay.onclick = closeSettings;
function closeSettings(){ settingsPanel.classList.remove('open'); settingsOverlay.classList.remove('show'); }

document.querySelectorAll('[data-unit]').forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll('[data-unit]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.unit = btn.dataset.unit;
    rerender();
  };
});

document.querySelectorAll('[data-lang]').forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll('[data-lang]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.lang = btn.dataset.lang;
    rerender();
  };
});

document.querySelectorAll('[data-wind]').forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll('[data-wind]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.windUnit = btn.dataset.wind;
    rerender();
  };
});

let acTimer;
cityInput.addEventListener('input', ()=>{
  clearTimeout(acTimer);
  const text = cityInput.value.trim();
  if(text.length<2){ suggestionsBox.innerHTML=''; return; }
  acTimer = setTimeout(async ()=>{
    try{
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(text)}&count=6&language=${state.lang}`);
      const data = await res.json();
      suggestionsBox.innerHTML='';
      if(!data.results) return;
      data.results.forEach(p=>{
        const div=document.createElement('div');
        div.innerHTML=`<b>${p.name}</b><small>${p.country||''} ${p.admin1||''}</small>`;
        div.onclick=()=>{ cityInput.value=p.name; suggestionsBox.innerHTML=''; getWeather(p.name,p.latitude,p.longitude); };
        suggestionsBox.appendChild(div);
      });
    }catch(e){ console.error(e); }
  }, 280);
});

cityInput.addEventListener('keydown', e=>{ if(e.key==='Enter'){ clearTimeout(acTimer); suggestionsBox.innerHTML=''; getWeather(cityInput.value); }});
searchBtn.onclick = ()=>{ suggestionsBox.innerHTML=''; getWeather(cityInput.value); };
document.addEventListener('click', e=>{ if(!e.target.closest('.search')&&!e.target.closest('.suggestions')) suggestionsBox.innerHTML=''; });

getWeather('Kyiv', 50.45, 30.52);