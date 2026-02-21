import { useState, useEffect, createContext, useContext } from "react";

// ── RESPONSIVE SYSTEM ──
function useWindowSize() {
  const [size, setSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 430, h: typeof window !== 'undefined' ? window.innerHeight : 800 });
  useEffect(() => {
    const handle = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return size;
}

function useResponsive() {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1100;
  const isDesktop = w >= 1100;
  const device = isDesktop ? "desktop" : isTablet ? "tablet" : "mobile";
  const contentMax = isDesktop ? "100%" : isTablet ? "100%" : 430;
  const cardMax = isDesktop ? 600 : isTablet ? 560 : 430;
  const pad = isDesktop ? 48 : isTablet ? 32 : 16;
  const cols = {
    quickAccess: isDesktop ? 4 : isTablet ? 4 : 4,
    movies: isDesktop ? 3 : isTablet ? 2 : 1,
    food: isDesktop ? 5 : isTablet ? 3 : 2,
    snacks: isDesktop ? 3 : isTablet ? 2 : 1,
    reviews: isDesktop ? 3 : isTablet ? 2 : 1,
    gameSlots: isDesktop ? 6 : isTablet ? 4 : 3,
    turfCards: isDesktop ? 2 : 1,
    canteen: isDesktop ? 3 : isTablet ? 3 : 3,
  };
  return { isMobile, isTablet, isDesktop, device, contentMax, cardMax, pad, cols, w };
}

const RCtx = createContext(null);
function useR() { return useContext(RCtx); }

const LOGO_URL = "https://i.postimg.cc/d0pZcWFK/Whats-App-Image-2026-02-20-at-11-20-53-PM.jpg";

function GKLogo({ size = 36 }) {
  const [err, setErr] = useState(false);
  if (LOGO_URL && !err) return (
    <div style={{width:size,height:size,borderRadius:size*0.22,overflow:"hidden",background:"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <img src={LOGO_URL} style={{width:"90%",height:"90%",objectFit:"contain"}} alt="GK" onError={()=>setErr(true)}/>
    </div>
  );
  return (
    <div style={{width:size,height:size,borderRadius:size*0.22,background:"linear-gradient(135deg,#1a1a2e,#16213e)",border:"2px solid #FFD700",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <span style={{color:"#FFD700",fontWeight:900,fontSize:size*0.38}}>GK</span>
    </div>
  );
}

const movies = [
  { id:1, title:"Taqdeer", sub:"Divine Decree", genre:"Drama", duration:"2h 10m", lang:"Hausa / English", rating:4.7, badge:"FEATURED", badgeColor:"#a855f7", gradient:"linear-gradient(135deg,#1a0533,#4a0080,#6b00cc)", posterLetter:"T", showtimes:[{time:"14:00",type:"Standard"},{time:"17:30",type:"VIP"},{time:"20:00",type:"Standard"}], dome:"Dome 1", price:2000 },
  { id:2, title:"Hakeem", sub:"Seeking Justice", genre:"Action", duration:"1h 58m", lang:"English", rating:4.6, badge:"BLOCKBUSTER", badgeColor:"#f97316", gradient:"linear-gradient(135deg,#0f0c29,#302b63,#1a1a4e)", posterLetter:"H", showtimes:[{time:"15:30",type:"IMAX"},{time:"18:00",type:"Standard"},{time:"21:30",type:"VIP"}], dome:"Dome 1", price:2000 },
  { id:3, title:"Rigar Aro", sub:"Kamal Films International", genre:"Drama", duration:"2h 00m", lang:"Hausa", rating:4.5, badge:"NOW SHOWING", badgeColor:"#22c55e", gradient:"linear-gradient(135deg,#0d1f0d,#1a4a1a,#0a2e0a)", posterLetter:"R", showtimes:[{time:"16:00",type:"Standard"},{time:"19:30",type:"VIP"}], dome:"Dome 1", price:2000 },
  { id:4, title:"Varanasi", sub:"SS Rajamouli", genre:"Epic", duration:"2h 45m", lang:"Telugu / Hindi / English", rating:4.9, badge:"EPIC", badgeColor:"#a855f7", gradient:"linear-gradient(135deg,#1a0a00,#7a3000,#c45000)", posterLetter:"V", showtimes:[{time:"13:00",type:"IMAX"},{time:"17:00",type:"Standard"},{time:"21:00",type:"VIP"}], dome:"Dome 1", price:2000 },
];

const allReviews = [
  { name:"Aminu Hassan", initials:"AH", color:"#3b82f6", rating:5, text:"Amazing experience! The IMAX screen is top-notch and the seats are super comfortable.", category:"Cinema", when:"2 days ago" },
  { name:"Fatima Bello", initials:"FB", color:"#eab308", rating:4, text:"Great sound quality and clean environment. Will definitely come back for more movies.", category:"Cinema", when:"2 days ago" },
  { name:"Ibrahim Yusuf", initials:"IY", color:"#10b981", rating:5, text:"Best football turf in Kano! The grass is fresh, floodlights are perfect for evening games.", category:"Turf", when:"3 days ago" },
  { name:"Aisha Abdullahi", initials:"AA", color:"#3b82f6", rating:5, text:"The PS5 setup is insane! Played for 2 hours straight. Staff were super friendly.", category:"Games Lounge", when:"Yesterday" },
  { name:"Halima Danladi", initials:"HD", color:"#a855f7", rating:4, text:"The popcorn combo is delicious! Prices are reasonable and service is quick.", category:"Snacks", when:"Yesterday" },
  { name:"Kabir Musa", initials:"KM", color:"#ec4899", rating:5, text:"Beef burger was absolutely amazing. Fresh ingredients and great taste.", category:"Snacks", when:"Yesterday" },
];

const snackItems = [
  { id:"sp", name:"Small Popcorn", desc:"Freshly popped, butter or plain", price:1500, icon:"🍿" },
  { id:"lp", name:"Large Popcorn", desc:"Shareable size with extra butter", price:3000, icon:"🍿" },
  { id:"cn", name:"Cheesy Nachos", desc:"Tortilla chips with melted cheese & salsa", price:3500, icon:"🧀" },
  { id:"bb", name:"Beef Burger", desc:"Double patty with chips", price:4200, icon:"🍔" },
  { id:"sl", name:"Slushie", desc:"Blue Raspberry / Strawberry", price:1500, icon:"🥤" },
  { id:"pc", name:"Popcorn Combo", desc:"Large Popcorn + Drink", price:3500, icon:"🎉" },
];

const canteen = [
  { name:"Popcorn Combo", desc:"Large Popcorn + Drink", price:"₦3,500", color:"#FFD700" },
  { name:"Beef Burger", desc:"Double Patty + Chips", price:"₦4,200", color:"#f97316" },
  { name:"Slushie", desc:"Blue Raspberry", price:"₦1,500", color:"#3b82f6" },
];

// ── FOOD MENU DATA ──
const foodCategories = ["Nigerian Classics", "Indo-Nigerian Fusion", "Cinema Snacks"];

const foodMenu = {
  "Nigerian Classics": [
    { id:"f1", name:"Suya Platter", desc:"Spicy grilled beef skewers with onions & yaji", size:"Small (4 sticks)", price:3500, emoji:"🍢", badge:"Bestseller", badgeColor:"#f97316" },
    { id:"f2", name:"Pounded Yam + Egusi Soup", desc:"With assorted meats & fish", size:"Serves 1–2", price:4800, emoji:"🍲", badge:null },
    { id:"f3", name:"Jollof Rice Special", desc:"Smoky party jollof with chicken", size:"Regular", price:3200, emoji:"🍛", badge:"Fan Fave", badgeColor:"#FFD700" },
    { id:"f4", name:"Pepper Soup", desc:"Goat / Chicken / Catfish — spicy & aromatic", size:"Medium bowl", price:3800, emoji:"🍵", badge:null },
    { id:"f5", name:"Asun", desc:"Spicy barbecued goat meat", size:"Small portion", price:4200, emoji:"🥩", badge:null },
  ],
  "Indo-Nigerian Fusion": [
    { id:"f6", name:"Beef Burger", desc:"Double patty with chips & coleslaw", size:"Double Patty + Chips", price:4200, emoji:"🍔", badge:"Bestseller", badgeColor:"#f97316" },
    { id:"f7", name:"Chicken Shawarma", desc:"Grilled chicken, veggies, garlic sauce in wrap", size:"Full wrap", price:2800, emoji:"🌯", badge:null },
    { id:"f8", name:"Coconut Rice + Grilled Fish", desc:"Fragrant coconut rice with whole tilapia", size:"Serves 1", price:4500, emoji:"🐟", badge:"Fan Fave", badgeColor:"#FFD700" },
    { id:"f9", name:"Spaghetti Jollof", desc:"Spaghetti cooked in rich tomato pepper sauce", size:"Regular", price:2500, emoji:"🍝", badge:null },
  ],
  "Cinema Snacks": [
    { id:"f10", name:"Popcorn Combo", desc:"Large Popcorn + your choice of drink", size:"Large", price:3500, emoji:"🍿", badge:"Popular", badgeColor:"#a855f7" },
    { id:"f11", name:"Small Popcorn", desc:"Freshly popped, butter or plain", size:"Small", price:1500, emoji:"🍿", badge:null },
    { id:"f12", name:"Large Popcorn", desc:"Shareable size with extra butter", size:"Large", price:3000, emoji:"🍿", badge:null },
    { id:"f13", name:"Cheesy Nachos", desc:"Tortilla chips with melted cheese & salsa", size:"Regular", price:3500, emoji:"🧀", badge:null },
    { id:"f14", name:"Slushy", desc:"Blue Raspberry / Strawberry / Mango", size:"Large cup", price:1500, emoji:"🥤", badge:null },
    { id:"f15", name:"Hot Dog", desc:"Beef frankfurter in toasted bun with toppings", size:"Single", price:2000, emoji:"🌭", badge:null },
  ],
};

const catStyle = {
  "Cinema":{ bg:"rgba(255,215,0,0.12)", color:"#FFD700", icon:"🎬" },
  "Turf":{ bg:"rgba(34,197,94,0.12)", color:"#22c55e", icon:"⚽" },
  "Games Lounge":{ bg:"rgba(236,72,153,0.12)", color:"#ec4899", icon:"🎮" },
  "Snacks":{ bg:"rgba(249,115,22,0.12)", color:"#f97316", icon:"🍔" },
};

// Turf slots
const turfSlots = [
  { time:"11:00 AM", end:"12:30 PM", status:"available" },
  { time:"12:30 PM", end:"02:00 PM", status:"booked" },
  { time:"02:00 PM", end:"03:30 PM", status:"available" },
  { time:"03:30 PM", end:"05:00 PM", status:"available" },
  { time:"05:00 PM", end:"06:30 PM", status:"booked" },
  { time:"06:30 PM", end:"08:00 PM", status:"available" },
  { time:"08:00 PM", end:"09:30 PM", status:"available" },
];

// Games data
const gameCategories = ["Snooker Table", "Video Games"];
const gameDurations = [
  { label:"30 Min", mins:30, price:2500 },
  { label:"1 Hour", mins:60, price:5000 },
  { label:"1.5 Hrs", mins:90, price:7500 },
  { label:"2 Hours", mins:120, price:10000 },
];
const gameSlots = [
  { time:"10:00 AM", left:2 }, { time:"11:00 AM", left:1 }, { time:"12:00 PM", left:3 },
  { time:"01:00 PM", left:0 }, { time:"02:00 PM", left:3 }, { time:"03:00 PM", left:2 },
  { time:"04:00 PM", left:1 }, { time:"05:00 PM", left:3 }, { time:"06:00 PM", left:2 },
  { time:"07:00 PM", left:1 }, { time:"08:00 PM", left:3 }, { time:"09:00 PM", left:2 },
];

const weekDays = [["TODAY","20","Feb"],["SAT","21","Feb"],["SUN","22","Feb"],["MON","23","Feb"],["TUE","24","Feb"],["WED","25","Feb"]];

function Stars({ count=0, size=14, interactive=false, onChange }) {
  return <span style={{display:"inline-flex",gap:2}}>
    {[1,2,3,4,5].map(i=>(
      <span key={i} onClick={()=>interactive&&onChange&&onChange(i)}
        style={{fontSize:size,color:i<=count?"#eab308":"#374151",cursor:interactive?"pointer":"default",lineHeight:1}}>★</span>
    ))}
  </span>;
}

function CategoryBadge({ cat }) {
  const s = catStyle[cat]||{bg:"#27272a",color:"#9ca3af",icon:"•"};
  return <span style={{background:s.bg,color:s.color,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20,display:"inline-flex",alignItems:"center",gap:3}}>{s.icon} {cat}</span>;
}

function CheckoutProgress({ step }) {
  const steps = ["Seats","Snacks","Details","Payment"];
  return (
    <div style={{padding:"0 16px 12px"}}>
      <div style={{display:"flex",alignItems:"center"}}>
        {steps.map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"auto"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:i<=step?"#FFD700":"#374151"}}/>
              <span style={{fontSize:9,color:i<=step?"#FFD700":"#6b7280",fontWeight:i===step?700:400,whiteSpace:"nowrap"}}>{s}</span>
            </div>
            {i<steps.length-1&&<div style={{flex:1,height:2,background:i<step?"#FFD700":"#374151",margin:"0 4px",marginBottom:14}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TURF PAGE ──
function TurfPage({ setPage, onBook }) {
  const r = useR();
  const p = r.pad;
  const [selDay, setSelDay] = useState(0);
  const turfs = [
    { id:1, name:"Green Turf Court", type:"Football", size:"5-a-Side", players:"Up to 20 players", price:30000, duration:"90 minutes", features:["⚽ Artificial Grass","💡 Floodlights","🚿 Changing Rooms","🅿️ Free Parking"], color:"#22c55e", slots:turfSlots },
    { id:2, name:"Arena Pitch B", type:"Football", size:"7-a-Side", players:"Up to 14 players", price:25000, duration:"90 minutes", features:["⚽ Artificial Grass","💡 Floodlights","🚿 Changing Rooms"], color:"#3b82f6", slots:turfSlots.slice(1) },
  ];
  const [selTurf, setSelTurf] = useState(turfs[0]);
  const [selSlot, setSelSlot] = useState(null);

  return (
    <div style={{paddingBottom:100}}>
      {/* Header */}
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12}}>
        <GKLogo size={36}/>
        <div style={{flex:1}}>
          <div style={{color:"#9ca3af",fontSize:11}}>BOOK A PITCH</div>
          <div style={{color:"white",fontWeight:700,fontSize:20}}>Turf Booking</div>
        </div>
      </div>

      {/* Turf cards */}
      <div style={{padding:`0 ${p}px ${p}px`,display:"grid",gridTemplateColumns:r.isDesktop?"1fr 1fr":"1fr",gap:12}}>
        {turfs.map(t=>(
          <div key={t.id} onClick={()=>{setSelTurf(t);setSelSlot(null);}}
            style={{background:"#18181b",border:`2px solid ${selTurf.id===t.id?t.color:"#27272a"}`,borderRadius:16,marginBottom:12,overflow:"hidden",cursor:"pointer"}}>
            {/* Banner */}
            <div style={{height:120,background:`linear-gradient(135deg,${t.color}33,${t.color}11)`,position:"relative",display:"flex",alignItems:"flex-end",padding:12}}>
              <div style={{position:"absolute",top:10,right:10,background:t.color,color:"white",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>⚽ {t.type}</div>
              <div style={{fontSize:60,position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",opacity:0.2}}>⚽</div>
              <div>
                <div style={{color:"white",fontWeight:700,fontSize:18}}>{t.name}</div>
                <div style={{color:"#9ca3af",fontSize:12}}>{t.duration} • {t.players} • Kano, NG</div>
              </div>
            </div>
            <div style={{padding:"10px 12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{color:"#FFD700",fontWeight:700,fontSize:18}}>₦{t.price.toLocaleString()}</span>
                <span style={{color:"#9ca3af",fontSize:12}}>per game</span>
                <span style={{background:"rgba(34,197,94,0.1)",color:"#22c55e",fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:12}}>
                  {t.slots.filter(s=>s.status==="available").length} slots open today
                </span>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {t.features.map(f=><span key={f} style={{background:"#27272a",color:"#9ca3af",fontSize:11,padding:"3px 8px",borderRadius:20}}>{f}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Date selector */}
      <div style={{padding:"0 16px 8px"}}>
        <div style={{color:"#6b7280",fontSize:11,letterSpacing:1,fontWeight:700,marginBottom:10}}>📅 SELECT DATE</div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {weekDays.map((d,i)=>(
            <button key={i} onClick={()=>{setSelDay(i);setSelSlot(null);}}
              style={{minWidth:56,padding:"8px",borderRadius:12,border:"none",cursor:"pointer",background:selDay===i?"#22c55e":"#27272a",display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
              <span style={{fontSize:9,color:selDay===i?"#000":"#9ca3af",fontWeight:600}}>{d[0]}</span>
              <span style={{fontSize:18,fontWeight:700,color:selDay===i?"#000":"white",lineHeight:1.2}}>{d[1]}</span>
              <span style={{fontSize:9,color:selDay===i?"#000":"#9ca3af"}}>{d[2]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div style={{padding:"12px 16px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{color:"#6b7280",fontSize:11,letterSpacing:1,fontWeight:700}}>⏰ AVAILABLE TIME SLOTS</div>
          <span style={{color:"#6b7280",fontSize:11}}>Tap a slot to select</span>
        </div>
        {selTurf.slots.map((slot,i)=>{
          const avail = slot.status==="available";
          const isSel = selSlot===i;
          return (
            <div key={i} onClick={()=>avail&&setSelSlot(i)}
              style={{background:isSel?"rgba(34,197,94,0.1)":"#18181b",border:`2px solid ${isSel?"#22c55e":avail?"#27272a":"#1a1a1a"}`,borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:12,cursor:avail?"pointer":"not-allowed",opacity:avail?1:0.5}}>
              <div style={{fontSize:24}}>{avail?"⚽":"🔒"}</div>
              <div style={{flex:1}}>
                <div style={{color:avail?"white":"#4b5563",fontWeight:700,fontSize:16}}>{slot.time} — {slot.end}</div>
                <div style={{color:"#6b7280",fontSize:12}}>90 minutes • Up to 20 players</div>
              </div>
              <div style={{background:avail?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)",color:avail?"#22c55e":"#ef4444",border:`1px solid ${avail?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"}`,padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>
                {avail?"Available":"Booked"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Features info */}
      <div style={{padding:"8px 16px 16px",display:"flex",gap:10}}>
        {[{icon:"⏱",title:"Flexible Duration",sub:"30 min to 2 hrs"},{icon:"✅",title:"Secure Booking",sub:"Instant confirmation"},{icon:"👥",title:"Group Friendly",sub:"Up to 6 players"}].map(f=>(
          <div key={f.title} style={{flex:1,background:"#18181b",border:"1px solid #27272a",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:4}}>{f.icon}</div>
            <div style={{color:"white",fontSize:11,fontWeight:700}}>{f.title}</div>
            <div style={{color:"#6b7280",fontSize:10,marginTop:2}}>{f.sub}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      {selSlot!==null && (
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
          <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"#9ca3af",fontSize:13}}>⚽ {selTurf.name}</span>
            <span style={{color:"#FFD700",fontWeight:700}}>₦{selTurf.price.toLocaleString()}</span>
          </div>
          <button onClick={()=>onBook({turf:selTurf,slot:selTurf.slots[selSlot],day:weekDays[selDay]})}
            style={{width:"100%",padding:"16px",background:"#22c55e",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:"#000",cursor:"pointer"}}>
            Continue to Book →
          </button>
        </div>
      )}
    </div>
  );
}

// ── TURF BOOKING FORM ──
function TurfBookingPage({ booking, onBack, onConfirm }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [teamName, setTeamName] = useState("");
  const ok = name.trim() && phone.trim().length >= 8;

  return (
    <div style={{paddingBottom:120,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:16}}>Turf Booking</div>
          <div style={{color:"#9ca3af",fontSize:12}}>{booking.turf.name}</div>
        </div>
        <GKLogo size={34}/>
      </div>

      <div style={{padding:"0 16px"}}>
        {/* Booking summary */}
        <div style={{background:"linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.05))",border:"1px solid rgba(34,197,94,0.3)",borderRadius:16,padding:14,marginBottom:20}}>
          <div style={{color:"#22c55e",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:8}}>BOOKING SUMMARY</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <span style={{background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",color:"#22c55e",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:600}}>⚽ {booking.turf.name}</span>
            <span style={{background:"#27272a",color:"white",padding:"4px 10px",borderRadius:8,fontSize:12}}>📅 {booking.day[0]} {booking.day[1]} {booking.day[2]}</span>
            <span style={{background:"#27272a",color:"white",padding:"4px 10px",borderRadius:8,fontSize:12}}>⏰ {booking.slot.time}</span>
            <span style={{background:"rgba(255,215,0,0.1)",color:"#FFD700",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:700}}>₦{booking.turf.price.toLocaleString()}</span>
          </div>
        </div>

        <div style={{color:"white",fontWeight:700,fontSize:20,marginBottom:4}}>Your Details</div>
        <div style={{color:"#9ca3af",fontSize:13,marginBottom:20}}>Enter contact info for booking confirmation</div>

        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20}}>👤</span>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>

        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:14,color:"white",fontWeight:600}}>🇳🇬 +234</span>
          <div style={{width:1,height:20,background:"#374151"}}/>
          <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} placeholder="Phone number" type="tel"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>

        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20}}>⚽</span>
          <input value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder="Team name (optional)"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>

        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14}}>
          <div style={{color:"#6b7280",fontSize:11,letterSpacing:1,fontWeight:700,marginBottom:10}}>PAYMENT</div>
          {[{id:"transfer",icon:"🏦",label:"Bank Transfer"},{id:"cash",icon:"💵",label:"Pay at Venue"},{id:"card",icon:"💳",label:"Card"}].map(m=>(
            <div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #27272a"}}>
              <span style={{fontSize:20}}>{m.icon}</span>
              <span style={{color:"white",fontSize:14,flex:1}}>{m.label}</span>
              <div style={{width:18,height:18,borderRadius:"50%",border:"2px solid #FFD700",background:m.id==="transfer"?"#FFD700":"transparent"}}/>
            </div>
          ))}
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        <button onClick={()=>ok&&onConfirm({name,phone,teamName})}
          style={{width:"100%",padding:"16px",background:ok?"#22c55e":"#27272a",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:ok?"#000":"#4b5563",cursor:ok?"pointer":"default"}}>
          Confirm Booking →
        </button>
      </div>
    </div>
  );
}

// ── TURF CONFIRMATION ──
function TurfConfirmPage({ booking, customer, onHome }) {
  const ref = "TF-"+Date.now().toString(36).toUpperCase().slice(-6);
  return (
    <div style={{paddingBottom:80,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onHome} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:16}}>Booking Confirmed</div>
          <div style={{color:"#22c55e",fontSize:12,fontWeight:600}}>✓ Turf Reserved</div>
        </div>
      </div>
      <div style={{padding:"0 16px"}}>
        <div style={{background:"linear-gradient(to right,rgba(34,197,94,0.15),rgba(34,197,94,0.05))",border:"1px solid rgba(34,197,94,0.3)",borderRadius:16,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(34,197,94,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>✅</div>
          <div>
            <div style={{color:"white",fontWeight:700,fontSize:15}}>Turf Booked!</div>
            <div style={{color:"#9ca3af",fontSize:12,marginTop:2}}>Ref: <span style={{color:"#22c55e",fontFamily:"monospace",fontWeight:700}}>{ref}</span></div>
          </div>
        </div>

        <div style={{background:"#18181b",borderRadius:20,overflow:"hidden",border:"1px solid #27272a",marginBottom:16}}>
          <div style={{height:80,background:"linear-gradient(135deg,#0d2e0d,#1a5a1a)",display:"flex",alignItems:"center",padding:16,gap:12,position:"relative"}}>
            <div style={{fontSize:40,opacity:0.3,position:"absolute",right:16}}>⚽</div>
            <div>
              <div style={{color:"white",fontWeight:700,fontSize:18}}>{booking.turf.name}</div>
              <div style={{color:"#22c55e",fontSize:12}}>Green Turf • Kano</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",padding:"0"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/>
            <div style={{flex:1,borderTop:"2px dashed #374151"}}/>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/>
          </div>
          <div style={{padding:"14px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>DATE</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{booking.day[0]} {booking.day[1]} {booking.day[2]}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>TIME</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{booking.slot.time}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>PLAYER</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{customer.name}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>AMOUNT</div><div style={{color:"#FFD700",fontWeight:700,fontSize:15}}>₦{booking.turf.price.toLocaleString()}</div></div>
            {customer.teamName&&<div style={{gridColumn:"span 2"}}><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>TEAM</div><div style={{color:"white",fontWeight:600,fontSize:14}}>⚽ {customer.teamName}</div></div>}
          </div>
          <div style={{display:"flex",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/>
            <div style={{flex:1,borderTop:"2px dashed #374151"}}/>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/>
          </div>
          <div style={{padding:16,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{background:"white",padding:10,borderRadius:12}}>
              <svg width={120} height={120} viewBox="0 0 120 120">
                {Array.from({length:12},(_,r)=>Array.from({length:12},(_,c)=>{
                  const h=(ref.charCodeAt(r%ref.length)*37+c*53+r*17)%97;
                  const fill=h>45||((r<3&&c<3)||(r<3&&c>8)||(r>8&&c<3));
                  return fill?<rect key={`${r}${c}`} x={c*10} y={r*10} width={10} height={10} fill="#000"/>:null;
                }))}
                <rect x={45} y={45} width={30} height={30} fill="white" rx={3}/>
                <text x={60} y={63} textAnchor="middle" fontSize={12} fontWeight={900} fill="#000">GK</text>
              </svg>
            </div>
            <div style={{color:"#22c55e",fontFamily:"monospace",fontSize:13,fontWeight:700,marginTop:8,background:"rgba(34,197,94,0.08)",padding:"4px 12px",borderRadius:8,border:"1px solid rgba(34,197,94,0.2)"}}>{ref}</div>
          </div>
        </div>
        <button onClick={onHome} style={{width:"100%",padding:"15px",background:"#22c55e",border:"none",borderRadius:14,fontWeight:700,fontSize:15,color:"#000",cursor:"pointer"}}>🏠 Back to Home</button>
      </div>
    </div>
  );
}

// ── GAMES LOUNGE PAGE ──
function GamesPage({ setPage, onBook }) {
  const r = useR();
  const [selCat, setSelCat] = useState(0);
  const [selDay, setSelDay] = useState(0);
  const [selDur, setSelDur] = useState(1);
  const [selSlot, setSelSlot] = useState(null);

  const dur = gameDurations[selDur];

  return (
    <div style={{paddingBottom:120}}>
      {/* Header */}
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12}}>
        <GKLogo size={36}/>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:18}}>Games & Lounge</div>
          <div style={{color:"#9ca3af",fontSize:12}}>Snooker Tables • Video Games</div>
        </div>
        <div style={{background:"rgba(236,72,153,0.1)",border:"1px solid rgba(236,72,153,0.3)",borderRadius:20,padding:"5px 12px"}}>
          <span style={{color:"#ec4899",fontSize:13,fontWeight:700}}>₦ {dur.price.toLocaleString()}/hr</span>
        </div>
      </div>

      {/* Category toggle */}
      <div style={{margin:"0 16px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,background:"#18181b",borderRadius:14,padding:4,border:"1px solid #27272a"}}>
        {gameCategories.map((c,i)=>(
          <button key={c} onClick={()=>setSelCat(i)}
            style={{padding:"12px",borderRadius:10,border:"none",cursor:"pointer",background:selCat===i?"#ec4899":"transparent",color:selCat===i?"white":"#9ca3af",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span>{i===0?"🎱":"🎮"}</span> {c}
          </button>
        ))}
      </div>

      {/* Banner */}
      <div style={{margin:"0 16px 16px",background:`linear-gradient(135deg,${selCat===0?"#1a0520,#4a1060":"#0a0a2e,#1a1a6e"})`,borderRadius:16,padding:20,position:"relative",overflow:"hidden",border:"1px solid rgba(236,72,153,0.2)"}}>
        <div style={{position:"absolute",right:-10,top:-10,fontSize:80,opacity:0.15}}>{selCat===0?"🎱":"🎮"}</div>
        <div style={{color:"#ec4899",fontSize:10,fontWeight:700,letterSpacing:2,marginBottom:6}}>{selCat===0?"SNOOKER TABLES":"VIDEO GAMES"}</div>
        <div style={{color:"white",fontWeight:700,fontSize:22,marginBottom:4}}>{selCat===0?"Premium Tables":"PS5 & VR Zone"}</div>
        <div style={{color:"#9ca3af",fontSize:13}}>{selCat===0?"Professional full-size snooker tables":"Latest consoles, VR headsets & Retro Arcade"}</div>
      </div>

      {/* Duration */}
      <div style={{padding:"0 16px 16px"}}>
        <div style={{color:"#6b7280",fontSize:11,letterSpacing:1,fontWeight:700,marginBottom:10}}>SELECT DURATION</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          {gameDurations.map((d,i)=>(
            <button key={i} onClick={()=>{setSelDur(i);setSelSlot(null);}}
              style={{padding:"10px 4px",borderRadius:12,border:`2px solid ${selDur===i?"#ec4899":"#374151"}`,background:selDur===i?"rgba(236,72,153,0.12)":"#18181b",cursor:"pointer",textAlign:"center"}}>
              <div style={{color:selDur===i?"#ec4899":"white",fontWeight:700,fontSize:13}}>{d.label}</div>
              <div style={{color:selDur===i?"#ec4899":"#6b7280",fontSize:11,marginTop:2}}>₦{d.price.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div style={{padding:"0 16px 12px"}}>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {weekDays.map((d,i)=>(
            <button key={i} onClick={()=>{setSelDay(i);setSelSlot(null);}}
              style={{minWidth:56,padding:"8px",borderRadius:12,border:"none",cursor:"pointer",background:selDay===i?"#ec4899":"#27272a",display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
              <span style={{fontSize:9,color:selDay===i?"#fff":"#9ca3af",fontWeight:600}}>{d[0]}</span>
              <span style={{fontSize:18,fontWeight:700,color:selDay===i?"#fff":"white",lineHeight:1.2}}>{d[1]}</span>
              <span style={{fontSize:9,color:selDay===i?"#fff":"#9ca3af"}}>{d[2]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div style={{padding:"0 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <div style={{color:"#6b7280",fontSize:11,letterSpacing:1,fontWeight:700}}>AVAILABLE TIME SLOTS • {weekDays[selDay][0]}, {weekDays[selDay][1]} {weekDays[selDay][2].toUpperCase()}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${r.cols.gameSlots},1fr)`,gap:8}}>
          {gameSlots.map((slot,i)=>{
            const full = slot.left===0;
            const isSel = selSlot===i;
            return (
              <button key={i} onClick={()=>!full&&setSelSlot(i)}
                style={{padding:"12px 8px",borderRadius:12,border:`2px solid ${isSel?"#ec4899":full?"#1a1a1a":"#27272a"}`,background:isSel?"rgba(236,72,153,0.12)":full?"#111":"#18181b",cursor:full?"not-allowed":"pointer",textAlign:"center",opacity:full?0.4:1}}>
                <div style={{color:isSel?"#ec4899":full?"#4b5563":"white",fontWeight:700,fontSize:13,lineHeight:1}}>{slot.time}</div>
                <div style={{marginTop:4,display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:full?"#ef4444":isSel?"#ec4899":"#22c55e"}}/>
                  <span style={{color:"#6b7280",fontSize:10}}>{full?"Full":`${slot.left} left`}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info cards */}
      <div style={{padding:"16px 16px 0",display:"flex",gap:10}}>
        {[{icon:"⏱",t:"Flexible Duration",s:"30 min to 2 hrs"},{icon:"✅",t:"Secure Booking",s:"Instant confirmation"},{icon:"👥",t:"Group Friendly",s:"Up to 6 players"}].map(f=>(
          <div key={f.t} style={{flex:1,background:"#18181b",border:"1px solid #27272a",borderRadius:12,padding:"10px 6px",textAlign:"center"}}>
            <div style={{fontSize:18,marginBottom:3}}>{f.icon}</div>
            <div style={{color:"white",fontSize:10,fontWeight:700}}>{f.t}</div>
            <div style={{color:"#6b7280",fontSize:9,marginTop:1}}>{f.s}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      {selSlot!==null && (
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
          <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"#9ca3af",fontSize:13}}>{selCat===0?"🎱":"🎮"} {gameCategories[selCat]} • {dur.label}</span>
            <span style={{color:"#FFD700",fontWeight:700}}>₦{dur.price.toLocaleString()}</span>
          </div>
          <button onClick={()=>onBook({category:gameCategories[selCat],duration:dur,slot:gameSlots[selSlot],day:weekDays[selDay]})}
            style={{width:"100%",padding:"16px",background:"#ec4899",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:"white",cursor:"pointer"}}>
            Continue to Book →
          </button>
        </div>
      )}
    </div>
  );
}

// ── GAMES BOOKING FORM ──
function GamesBookingPage({ booking, onBack, onConfirm }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const ok = name.trim() && phone.trim().length >= 8;

  return (
    <div style={{paddingBottom:120,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:16}}>Games Booking</div>
          <div style={{color:"#9ca3af",fontSize:12}}>{booking.category}</div>
        </div>
        <GKLogo size={34}/>
      </div>

      <div style={{padding:"0 16px"}}>
        <div style={{background:"linear-gradient(135deg,rgba(236,72,153,0.15),rgba(236,72,153,0.05))",border:"1px solid rgba(236,72,153,0.3)",borderRadius:16,padding:14,marginBottom:20}}>
          <div style={{color:"#ec4899",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:8}}>BOOKING SUMMARY</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <span style={{background:"rgba(236,72,153,0.1)",border:"1px solid rgba(236,72,153,0.2)",color:"#ec4899",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:600}}>{booking.category==="Snooker Table"?"🎱":"🎮"} {booking.category}</span>
            <span style={{background:"#27272a",color:"white",padding:"4px 10px",borderRadius:8,fontSize:12}}>⏱ {booking.duration.label}</span>
            <span style={{background:"#27272a",color:"white",padding:"4px 10px",borderRadius:8,fontSize:12}}>⏰ {booking.slot.time}</span>
            <span style={{background:"rgba(255,215,0,0.1)",color:"#FFD700",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:700}}>₦{booking.duration.price.toLocaleString()}</span>
          </div>
        </div>

        <div style={{color:"white",fontWeight:700,fontSize:20,marginBottom:16}}>Your Details</div>

        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20}}>👤</span>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>

        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:14,color:"white",fontWeight:600}}>🇳🇬 +234</span>
          <div style={{width:1,height:20,background:"#374151"}}/>
          <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} placeholder="Phone number" type="tel"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>

        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14}}>
          <div style={{color:"#6b7280",fontSize:11,letterSpacing:1,fontWeight:700,marginBottom:12}}>PAYMENT BREAKDOWN</div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{color:"#9ca3af",fontSize:13}}>{booking.category} — {booking.duration.label}</span>
            <span style={{color:"white",fontSize:13}}>₦{booking.duration.price.toLocaleString()}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,borderTop:"1px solid #374151"}}>
            <span style={{color:"white",fontWeight:700}}>Total</span>
            <span style={{color:"#FFD700",fontWeight:700,fontSize:18}}>₦{booking.duration.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        <button onClick={()=>ok&&onConfirm({name,phone})}
          style={{width:"100%",padding:"16px",background:ok?"#ec4899":"#27272a",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:ok?"white":"#4b5563",cursor:ok?"pointer":"default"}}>
          Confirm Booking →
        </button>
      </div>
    </div>
  );
}

// ── GAMES CONFIRM ──
function GamesConfirmPage({ booking, customer, onHome }) {
  const ref = "GM-"+Date.now().toString(36).toUpperCase().slice(-6);
  return (
    <div style={{paddingBottom:80,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onHome} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:16}}>Booking Confirmed</div>
          <div style={{color:"#ec4899",fontSize:12,fontWeight:600}}>✓ Games Session Reserved</div>
        </div>
      </div>
      <div style={{padding:"0 16px"}}>
        <div style={{background:"linear-gradient(to right,rgba(236,72,153,0.15),rgba(236,72,153,0.05))",border:"1px solid rgba(236,72,153,0.3)",borderRadius:16,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(236,72,153,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>✅</div>
          <div>
            <div style={{color:"white",fontWeight:700,fontSize:15}}>Games Session Booked!</div>
            <div style={{color:"#9ca3af",fontSize:12,marginTop:2}}>Ref: <span style={{color:"#ec4899",fontFamily:"monospace",fontWeight:700}}>{ref}</span></div>
          </div>
        </div>

        <div style={{background:"#18181b",borderRadius:20,overflow:"hidden",border:"1px solid #27272a",marginBottom:16}}>
          <div style={{height:80,background:"linear-gradient(135deg,#1a0520,#3d0d4e)",display:"flex",alignItems:"center",padding:16,gap:12,position:"relative"}}>
            <div style={{fontSize:50,opacity:0.2,position:"absolute",right:16}}>{booking.category==="Snooker Table"?"🎱":"🎮"}</div>
            <div>
              <div style={{color:"white",fontWeight:700,fontSize:18}}>{booking.category}</div>
              <div style={{color:"#ec4899",fontSize:12}}>Games & Lounge • Gidan Kallo</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/>
            <div style={{flex:1,borderTop:"2px dashed #374151"}}/>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/>
          </div>
          <div style={{padding:"14px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>DATE</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{booking.day[0]} {booking.day[1]} {booking.day[2]}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>TIME</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{booking.slot.time}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>DURATION</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{booking.duration.label}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>AMOUNT</div><div style={{color:"#FFD700",fontWeight:700,fontSize:15}}>₦{booking.duration.price.toLocaleString()}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>PLAYER</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{customer.name}</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/>
            <div style={{flex:1,borderTop:"2px dashed #374151"}}/>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/>
          </div>
          <div style={{padding:16,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{background:"white",padding:10,borderRadius:12}}>
              <svg width={120} height={120} viewBox="0 0 120 120">
                {Array.from({length:12},(_,r)=>Array.from({length:12},(_,c)=>{
                  const h=(ref.charCodeAt(r%ref.length)*37+c*53+r*17)%97;
                  const fill=h>45||((r<3&&c<3)||(r<3&&c>8)||(r>8&&c<3));
                  return fill?<rect key={`${r}${c}`} x={c*10} y={r*10} width={10} height={10} fill="#000"/>:null;
                }))}
                <rect x={45} y={45} width={30} height={30} fill="white" rx={3}/>
                <text x={60} y={63} textAnchor="middle" fontSize={12} fontWeight={900} fill="#000">GK</text>
              </svg>
            </div>
            <div style={{color:"#ec4899",fontFamily:"monospace",fontSize:13,fontWeight:700,marginTop:8,background:"rgba(236,72,153,0.08)",padding:"4px 12px",borderRadius:8,border:"1px solid rgba(236,72,153,0.2)"}}>{ref}</div>
          </div>
        </div>
        <button onClick={onHome} style={{width:"100%",padding:"15px",background:"#ec4899",border:"none",borderRadius:14,fontWeight:700,fontSize:15,color:"white",cursor:"pointer"}}>🏠 Back to Home</button>
      </div>
    </div>
  );
}

// ── FOOD PAGE ──
function FoodPage({ setPage, cart, setCart }) {
  const r = useR();
  const p = r.pad;
  const [selCat, setSelCat] = useState(0);
  const catKey = foodCategories[selCat];
  const items = foodMenu[catKey];
  const totalQty = Object.values(cart).reduce((a,b)=>a+b,0);

  const changeQty = (id, delta) => {
    setCart(c => {
      const next = {...c, [id]: Math.max(0, (c[id]||0) + delta)};
      if (!next[id]) delete next[id];
      return next;
    });
  };

  const todaySpecial = { title:"Couple Date Night", sub:"Bundle — Save ₦2,000 tonight", bg:"linear-gradient(135deg,#1a0a00,#7a2000)", emoji:"🕯️" };

  return (
    <div style={{paddingBottom:r.isMobile?100:120}}>
      {/* Header */}
      <div style={{padding:`${p}px`,display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}>
          <div style={{color:"#9ca3af",fontSize:r.isMobile?11:13,fontWeight:700,letterSpacing:1}}>GIDAN KALLO</div>
          <div style={{color:"#FFD700",fontWeight:700,fontSize:r.isMobile?22:28}}>Food &amp; Drinks</div>
          <div style={{color:"#6b7280",fontSize:r.isMobile?12:14,marginTop:2}}>Fresh • Flavorful • Cinema-Ready 🎬</div>
        </div>
        {/* Cart button */}
        <button onClick={()=>totalQty>0&&setPage("food-cart")}
          style={{position:"relative",width:46,height:46,borderRadius:14,background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.3)",cursor:totalQty>0?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
          🛒
          {totalQty>0&&<div style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:"50%",background:"#FFD700",color:"#000",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{totalQty}</div>}
        </button>
      </div>

      {/* Today's Special Banner */}
      <div style={{margin:"0 16px 16px",background:todaySpecial.bg,borderRadius:18,overflow:"hidden",position:"relative",padding:"18px 16px",border:"1px solid rgba(255,215,0,0.2)"}}>
        <div style={{position:"absolute",right:-10,top:-10,fontSize:80,opacity:0.15}}>{todaySpecial.emoji}</div>
        <div style={{background:"rgba(255,100,0,0.85)",borderRadius:20,padding:"3px 12px",display:"inline-flex",alignItems:"center",gap:5,marginBottom:8}}>
          <span style={{fontSize:13}}>🔥</span>
          <span style={{color:"white",fontSize:11,fontWeight:700}}>TODAY'S SPECIAL</span>
        </div>
        <div style={{color:"white",fontWeight:700,fontSize:22,lineHeight:1.2,marginBottom:4}}>{todaySpecial.title}</div>
        <div style={{color:"#d1d5db",fontSize:13}}>{todaySpecial.sub}</div>
      </div>

      {/* Category tabs */}
      <div style={{display:"flex",gap:8,padding:"0 16px 14px",overflowX:"auto"}}>
        {foodCategories.map((c,i)=>(
          <button key={c} onClick={()=>setSelCat(i)}
            style={{padding:"8px 16px",borderRadius:22,border:"none",cursor:"pointer",background:selCat===i?"#FFD700":"#27272a",color:selCat===i?"#000":"#9ca3af",fontWeight:700,fontSize:13,whiteSpace:"nowrap",flexShrink:0}}>
            {c}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div style={{padding:`0 ${p}px`,display:"grid",gridTemplateColumns:`repeat(${r.cols.food},1fr)`,gap:r.isMobile?12:16}}>
        {items.map(item=>{
          const qty = cart[item.id]||0;
          return (
            <div key={item.id} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:16,overflow:"hidden",position:"relative"}}>
              {/* Badge */}
              {item.badge&&(
                <div style={{position:"absolute",top:8,left:8,zIndex:2,background:item.badgeColor,color:"white",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:12,display:"flex",alignItems:"center",gap:3}}>
                  {item.badge==="Fan Fave"?"⭐ ":item.badge==="Bestseller"?"🔥 ":""}{item.badge}
                </div>
              )}
              {/* Image area */}
              <div style={{height:110,background:`linear-gradient(135deg,#1a1a1a,#27272a)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:56,position:"relative"}}>
                {item.emoji}
              </div>
              {/* Info */}
              <div style={{padding:"10px 10px 8px"}}>
                <div style={{color:"white",fontWeight:700,fontSize:13,marginBottom:2,lineHeight:1.3}}>{item.name}</div>
                <div style={{color:"#6b7280",fontSize:10,marginBottom:2,lineHeight:1.4}}>{item.desc}</div>
                <div style={{color:"#4b5563",fontSize:10,marginBottom:8}}>{item.size}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{color:"#FFD700",fontWeight:700,fontSize:14}}>₦{item.price.toLocaleString()}</span>
                  {qty===0
                    ? <button onClick={()=>changeQty(item.id,1)}
                        style={{width:30,height:30,borderRadius:"50%",background:"#FFD700",border:"none",color:"#000",fontSize:18,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
                    : <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <button onClick={()=>changeQty(item.id,-1)}
                          style={{width:26,height:26,borderRadius:"50%",background:"#27272a",border:"1px solid #374151",color:"white",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                        <span style={{color:"white",fontWeight:700,fontSize:14,minWidth:14,textAlign:"center"}}>{qty}</span>
                        <button onClick={()=>changeQty(item.id,1)}
                          style={{width:26,height:26,borderRadius:"50%",background:"#FFD700",border:"none",color:"#000",fontSize:16,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      </div>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Cart sticky CTA */}
      {totalQty>0&&(
        <div style={{position:"fixed",bottom:70,left:"50%",transform:"translateX(-50%)",width:`calc(100% - ${p*2}px)`,maxWidth:r.isMobile?398:700,zIndex:40}}>
          <button onClick={()=>setPage("food-cart")}
            style={{width:"100%",padding:"16px",background:"#FFD700",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:"#000",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 8px 24px rgba(255,215,0,0.3)"}}>
            <span style={{background:"rgba(0,0,0,0.15)",borderRadius:8,padding:"2px 10px",fontSize:14}}>{totalQty} item{totalQty>1?"s":""}</span>
            <span>View Cart 🛒</span>
            <span>₦{Object.entries(cart).reduce((s,[id,q])=>{
              const all=Object.values(foodMenu).flat();
              const it=all.find(x=>x.id===id);
              return s+(it?it.price*q:0);
            },0).toLocaleString()}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ── FOOD CART PAGE ──
function FoodCartPage({ cart, setCart, onBack, onCheckout }) {
  const allItems = Object.values(foodMenu).flat();
  const cartItems = Object.entries(cart).map(([id,qty])=>{
    const item = allItems.find(x=>x.id===id);
    return item ? {...item, qty} : null;
  }).filter(Boolean);

  const subtotal = cartItems.reduce((s,i)=>s+i.price*i.qty,0);
  const service = Math.round(subtotal*0.015);
  const total = subtotal+service;

  const changeQty = (id, delta) => {
    setCart(c=>{
      const next={...c,[id]:Math.max(0,(c[id]||0)+delta)};
      if(!next[id]) delete next[id];
      return next;
    });
  };

  if(cartItems.length===0) return (
    <div style={{minHeight:"100vh",background:"#09090b",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14}}>
      <div style={{fontSize:60}}>🛒</div>
      <div style={{color:"white",fontWeight:700,fontSize:20}}>Your cart is empty</div>
      <button onClick={onBack} style={{background:"#FFD700",color:"#000",border:"none",padding:"12px 28px",borderRadius:12,fontWeight:700,cursor:"pointer"}}>Browse Menu</button>
    </div>
  );

  return (
    <div style={{paddingBottom:120,background:"#09090b",minHeight:"100vh"}}>
      {/* Header */}
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:18}}>Your Cart</div><div style={{color:"#9ca3af",fontSize:12}}>{cartItems.length} item{cartItems.length>1?"s":""}</div></div>
        <GKLogo size={34}/>
      </div>

      <div style={{padding:"0 16px"}}>
        {/* Cart items */}
        {cartItems.map(item=>(
          <div key={item.id} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:36,flexShrink:0}}>{item.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:"white",fontWeight:700,fontSize:14}}>{item.name}</div>
              <div style={{color:"#6b7280",fontSize:11,marginTop:1}}>{item.size}</div>
              <div style={{color:"#FFD700",fontWeight:700,fontSize:13,marginTop:4}}>₦{(item.price*item.qty).toLocaleString()}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <button onClick={()=>changeQty(item.id,-1)}
                style={{width:28,height:28,borderRadius:"50%",background:"#27272a",border:"1px solid #374151",color:"white",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{color:"white",fontWeight:700,fontSize:15,minWidth:16,textAlign:"center"}}>{item.qty}</span>
              <button onClick={()=>changeQty(item.id,1)}
                style={{width:28,height:28,borderRadius:"50%",background:"#FFD700",border:"none",color:"#000",fontSize:16,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          </div>
        ))}

        {/* Order summary */}
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:16,padding:16,marginTop:6}}>
          <div style={{color:"#6b7280",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:12}}>ORDER SUMMARY</div>
          {cartItems.map(item=>(
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{color:"#9ca3af",fontSize:13}}>{item.qty}× {item.name}</span>
              <span style={{color:"white",fontSize:13}}>₦{(item.price*item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{borderTop:"1px solid #27272a",marginTop:8,paddingTop:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{color:"#9ca3af",fontSize:13}}>Service charge (1.5%)</span>
              <span style={{color:"#9ca3af",fontSize:13}}>₦{service.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
              <span style={{color:"white",fontWeight:700,fontSize:16}}>Total</span>
              <span style={{color:"#FFD700",fontWeight:700,fontSize:18}}>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Pickup notice */}
        <div style={{background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,padding:"10px 14px",marginTop:12,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}>🏃</span>
          <div><div style={{color:"#22c55e",fontWeight:700,fontSize:13}}>Pick-up at the Counter</div><div style={{color:"#6b7280",fontSize:11,marginTop:1}}>Show your order code at the food counter</div></div>
        </div>
      </div>

      {/* Proceed CTA */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        <button onClick={()=>onCheckout(total)}
          style={{width:"100%",padding:"16px",background:"#FFD700",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:"#000",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          Proceed to Checkout → <span style={{opacity:0.7,fontSize:14}}>₦{total.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
}

// ── FOOD CHECKOUT PAGE ──
function FoodCheckoutPage({ cart, total, onBack, onConfirm }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [payMethod, setPayMethod] = useState("transfer");
  const ok = name.trim() && phone.trim().length >= 8;

  const allItems = Object.values(foodMenu).flat();
  const cartItems = Object.entries(cart).map(([id,qty])=>{
    const item = allItems.find(x=>x.id===id);
    return item ? {...item, qty} : null;
  }).filter(Boolean);

  return (
    <div style={{paddingBottom:120,background:"#09090b",minHeight:"100vh"}}>
      {/* Header */}
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:18}}>Checkout</div><div style={{color:"#9ca3af",fontSize:12}}>Almost done!</div></div>
        <GKLogo size={34}/>
      </div>

      <div style={{padding:"0 16px"}}>
        {/* Order recap */}
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:16,padding:14,marginBottom:20}}>
          <div style={{color:"#6b7280",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10}}>YOUR ORDER</div>
          {cartItems.map(item=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:22}}>{item.emoji}</span>
              <div style={{flex:1}}>
                <div style={{color:"white",fontSize:13,fontWeight:600}}>{item.qty}× {item.name}</div>
              </div>
              <span style={{color:"#FFD700",fontSize:13,fontWeight:700}}>₦{(item.price*item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{borderTop:"1px solid #374151",marginTop:8,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
            <span style={{color:"white",fontWeight:700}}>Total</span>
            <span style={{color:"#FFD700",fontWeight:700,fontSize:16}}>₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div style={{color:"white",fontWeight:700,fontSize:18,marginBottom:4}}>Your Details</div>
        <div style={{color:"#9ca3af",fontSize:13,marginBottom:16}}>Order confirmation will be sent to you</div>

        {/* Inputs */}
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:18}}>👤</span>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:14,color:"white",fontWeight:600}}>🇳🇬 +234</span>
          <div style={{width:1,height:20,background:"#374151"}}/>
          <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} placeholder="Phone number" type="tel"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:18}}>✉️</span>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)"
            style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/>
        </div>

        {/* Payment method */}
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14}}>
          <div style={{color:"#6b7280",fontSize:11,letterSpacing:1,fontWeight:700,marginBottom:10}}>PAYMENT METHOD</div>
          {[{id:"transfer",icon:"🏦",label:"Bank Transfer"},{id:"cash",icon:"💵",label:"Pay at Counter"},{id:"card",icon:"💳",label:"Card"}].map(m=>(
            <div key={m.id} onClick={()=>setPayMethod(m.id)}
              style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #27272a",cursor:"pointer"}}>
              <span style={{fontSize:20}}>{m.icon}</span>
              <span style={{color:"white",fontSize:14,flex:1}}>{m.label}</span>
              <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${payMethod===m.id?"#FFD700":"#4b5563"}`,background:payMethod===m.id?"#FFD700":"transparent"}}/>
            </div>
          ))}
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        <button onClick={()=>ok&&onConfirm({name,phone,email,payMethod})}
          style={{width:"100%",padding:"16px",background:ok?"#FFD700":"#27272a",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:ok?"#000":"#4b5563",cursor:ok?"pointer":"default"}}>
          Place Order →
        </button>
      </div>
    </div>
  );
}

// ── FOOD CONFIRM PAGE ──
function FoodConfirmPage({ cart, total, customer, onHome }) {
  const ref = "FD-"+Date.now().toString(36).toUpperCase().slice(-6);
  const allItems = Object.values(foodMenu).flat();
  const cartItems = Object.entries(cart).map(([id,qty])=>{
    const item = allItems.find(x=>x.id===id);
    return item ? {...item, qty} : null;
  }).filter(Boolean);

  return (
    <div style={{paddingBottom:80,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onHome} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:16}}>Order Confirmed!</div>
          <div style={{color:"#FFD700",fontSize:12,fontWeight:600}}>✓ Food Order Placed</div>
        </div>
        <GKLogo size={34}/>
      </div>

      <div style={{padding:"0 16px"}}>
        {/* Success banner */}
        <div style={{background:"linear-gradient(to right,rgba(255,215,0,0.12),rgba(255,215,0,0.04))",border:"1px solid rgba(255,215,0,0.3)",borderRadius:16,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:46,height:46,borderRadius:"50%",background:"rgba(255,215,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>✅</div>
          <div>
            <div style={{color:"white",fontWeight:700,fontSize:15}}>Order Received!</div>
            <div style={{color:"#9ca3af",fontSize:12,marginTop:2}}>Ref: <span style={{color:"#FFD700",fontFamily:"monospace",fontWeight:700}}>{ref}</span></div>
          </div>
        </div>

        {/* Order ticket */}
        <div style={{background:"#18181b",borderRadius:20,overflow:"hidden",border:"1px solid #27272a",marginBottom:16}}>
          {/* Header */}
          <div style={{height:80,background:"linear-gradient(135deg,#1a0f00,#5a2d00)",display:"flex",alignItems:"center",padding:16,gap:12,position:"relative"}}>
            <div style={{position:"absolute",right:16,fontSize:50,opacity:0.15}}>🍔</div>
            <div>
              <div style={{color:"white",fontWeight:700,fontSize:18}}>Food &amp; Drinks Order</div>
              <div style={{color:"#FFD700",fontSize:12}}>Gidan Kallo Canteen</div>
            </div>
          </div>
          {/* Dashed divider */}
          <div style={{display:"flex",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/>
            <div style={{flex:1,borderTop:"2px dashed #374151"}}/>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/>
          </div>
          {/* Items */}
          <div style={{padding:"14px 16px"}}>
            <div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:10}}>ORDER ITEMS</div>
            {cartItems.map(item=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:20}}>{item.emoji}</span>
                <span style={{color:"white",fontSize:13,flex:1}}>{item.qty}× {item.name}</span>
                <span style={{color:"#FFD700",fontSize:13,fontWeight:700}}>₦{(item.price*item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{borderTop:"1px solid #27272a",marginTop:10,paddingTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>CUSTOMER</div><div style={{color:"white",fontWeight:600,fontSize:13}}>{customer.name}</div></div>
              <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>TOTAL PAID</div><div style={{color:"#FFD700",fontWeight:700,fontSize:15}}>₦{total.toLocaleString()}</div></div>
              <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:4}}>PAYMENT</div><div style={{color:"white",fontSize:12}}>{customer.payMethod==="transfer"?"Bank Transfer":customer.payMethod==="cash"?"Pay at Counter":"Card"}</div></div>
            </div>
          </div>
          {/* Dashed divider */}
          <div style={{display:"flex",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/>
            <div style={{flex:1,borderTop:"2px dashed #374151"}}/>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/>
          </div>
          {/* QR code */}
          <div style={{padding:16,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{background:"white",padding:10,borderRadius:12}}>
              <svg width={120} height={120} viewBox="0 0 120 120">
                {Array.from({length:12},(_,r)=>Array.from({length:12},(_,c)=>{
                  const h=(ref.charCodeAt(r%ref.length)*37+c*53+r*17)%97;
                  const fill=h>45||((r<3&&c<3)||(r<3&&c>8)||(r>8&&c<3));
                  return fill?<rect key={`${r}${c}`} x={c*10} y={r*10} width={10} height={10} fill="#000"/>:null;
                }))}
                <rect x={45} y={45} width={30} height={30} fill="white" rx={3}/>
                <text x={60} y={63} textAnchor="middle" fontSize={12} fontWeight={900} fill="#000">GK</text>
              </svg>
            </div>
            <div style={{color:"#FFD700",fontFamily:"monospace",fontSize:13,fontWeight:700,marginTop:8,background:"rgba(255,215,0,0.08)",padding:"4px 12px",borderRadius:8,border:"1px solid rgba(255,215,0,0.2)"}}>{ref}</div>
            <div style={{color:"#6b7280",fontSize:11,marginTop:6,textAlign:"center"}}>Show this code at the food counter</div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <button style={{padding:"13px",background:"#18181b",border:"1px solid #27272a",borderRadius:12,color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>📤 Share</button>
          <button onClick={()=>onHome()} style={{padding:"13px",background:"rgba(255,215,0,0.08)",border:"1px solid rgba(255,215,0,0.3)",borderRadius:12,color:"#FFD700",fontSize:13,fontWeight:600,cursor:"pointer"}}>🍔 Order More</button>
        </div>
        <button onClick={onHome} style={{width:"100%",padding:"15px",background:"#FFD700",border:"none",borderRadius:14,fontWeight:700,fontSize:15,color:"#000",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>🏠 Back to Home</button>
      </div>
    </div>
  );
}

// ── NAV ──
function Nav({ page, setPage }) {
  const r = useR();
  const hiddenPages = ["seats","snacks","details","payment","ticket","turf-book","turf-confirm","games-book","games-confirm","food-cart","food-checkout","food-confirm"];
  if (hiddenPages.includes(page)) return null;
  const tabs=[{id:"home",emoji:"🏠",label:"Home"},{id:"cinema",emoji:"🎬",label:"Cinema"},{id:"turf",emoji:"⚽",label:"Turf"},{id:"games",emoji:"🎮",label:"Games"},{id:"food",emoji:"🍔",label:"Food"}];
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,width:"100%",background:"#18181b",borderTop:"1px solid #27272a",display:"flex",zIndex:50,justifyContent:"center"}}>
      <div style={{display:"flex",width:"100%",maxWidth:r.isMobile?430:900}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>setPage(t.id)} style={{flex:1,padding:r.isMobile?"8px 0 10px":"12px 0 14px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:r.isMobile?2:4,transition:"all 0.2s"}}>
          <span style={{fontSize:r.isMobile?20:24,lineHeight:1}}>{t.emoji}</span>
          <span style={{fontSize:r.isMobile?10:12,color:page===t.id?"#FFD700":"#6b7280",fontWeight:page===t.id?700:400}}>{t.label}</span>
        </button>
      ))}
      </div>
    </div>
  );
}

// ── REVIEW MODAL ──
function ReviewModal({ onClose, onSubmit }) {
  const [service,setService]=useState(""); const [name,setName]=useState(""); const [rating,setRating]=useState(0); const [text,setText]=useState("");
  const services=[{id:"Cinema",icon:"🎬",color:"#FFD700",border:"#FFD700",bg:"rgba(255,215,0,0.12)"},{id:"Turf",icon:"⚽",color:"#22c55e",border:"#22c55e",bg:"rgba(34,197,94,0.12)"},{id:"Games Lounge",icon:"🎮",color:"#ec4899",border:"#ec4899",bg:"rgba(236,72,153,0.12)"},{id:"Snacks",icon:"🍔",color:"#f97316",border:"#f97316",bg:"rgba(249,115,22,0.12)"}];
  const ok=service&&name.trim()&&rating>0&&text.trim().length>5;
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.65)"}} onClick={onClose}/>
      <div style={{background:"#18181b",borderRadius:"24px 24px 0 0",padding:"0 16px 32px",position:"relative",maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"center",paddingTop:12,paddingBottom:8}}><div style={{width:40,height:4,background:"#374151",borderRadius:2}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <span style={{color:"white",fontWeight:700,fontSize:20}}>Share Your Experience</span>
          <button onClick={onClose} style={{background:"#27272a",border:"none",borderRadius:"50%",width:34,height:34,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
          {services.map(s=><button key={s.id} onClick={()=>setService(s.id)} style={{padding:"13px",borderRadius:14,border:`2px solid ${service===s.id?s.border:"#374151"}`,background:service===s.id?s.bg:"transparent",color:service===s.id?s.color:"#9ca3af",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{fontSize:18}}>{s.icon}</span>{s.id}</button>)}
        </div>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{width:"100%",padding:"13px",background:"#27272a",border:"1px solid #374151",borderRadius:12,color:"white",fontSize:14,marginBottom:12,boxSizing:"border-box",outline:"none"}}/>
        <div style={{background:"#27272a",border:"1px solid #374151",borderRadius:12,padding:"14px",marginBottom:12,display:"flex",gap:4}}>
          <Stars count={rating} size={28} interactive onChange={setRating}/>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value.slice(0,500))} placeholder="Tell us about your experience..." style={{width:"100%",padding:"13px",background:"#27272a",border:"1px solid #374151",borderRadius:12,color:"white",fontSize:14,minHeight:100,resize:"none",boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
        <div style={{textAlign:"right",color:"#6b7280",fontSize:11,marginBottom:12}}>{text.length}/500</div>
        <button onClick={()=>ok&&onSubmit({service,name,rating,text})} style={{width:"100%",padding:"15px",background:ok?"#FFD700":"#27272a",border:"none",borderRadius:14,color:ok?"#000":"#4b5563",fontWeight:700,fontSize:15,cursor:ok?"pointer":"default"}}>✈️ Submit Review</button>
      </div>
    </div>
  );
}

function ReviewsPage({ reviews, onBack, onWrite }) {
  const r = useR();
  const p = r.pad;
  return (
    <div style={{paddingBottom:r.isMobile?100:120}}>
      <div style={{padding:`${p}px`,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div><div style={{color:"#9ca3af",fontSize:r.isMobile?11:13}}>ALL FEEDBACK</div><div style={{color:"white",fontWeight:700,fontSize:r.isMobile?20:24}}>Customer Reviews</div></div>
      </div>
      <div style={{padding:`0 ${p}px`,display:"grid",gridTemplateColumns:r.isDesktop?"1fr 1fr":r.isTablet?"1fr 1fr":"1fr",gap:r.isMobile?10:14}}>
        {reviews.map((rv,i)=>(
          <div key={i} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:r.isMobile?14:18,padding:r.isMobile?14:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{background:rv.color,borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:13,flexShrink:0}}>{rv.initials}</div>
                <div><div style={{color:"white",fontWeight:700,fontSize:14,marginBottom:4}}>{rv.name}</div><div style={{display:"flex",gap:6}}><Stars count={rv.rating} size={13}/><CategoryBadge cat={rv.category}/></div></div>
              </div>
              <span style={{color:"#6b7280",fontSize:11,flexShrink:0}}>{rv.when}</span>
            </div>
            <div style={{color:"#9ca3af",fontSize:13,lineHeight:1.5}}>{rv.text}</div>
          </div>
        ))}
      </div>
      <div style={{position:"fixed",bottom:72,right:r.isMobile?16:32,zIndex:40}}>
        <button onClick={onWrite} style={{background:"#FFD700",border:"none",borderRadius:28,padding:"13px 20px",fontWeight:700,fontSize:14,color:"#000",cursor:"pointer",boxShadow:"0 4px 20px rgba(255,215,0,0.3)"}}>⭐ Write a Review</button>
      </div>
    </div>
  );
}

// ── HOME & CINEMA (condensed) ──
function HomePage({ setPage, reviews, onRateClick, onSeeAll }) {
  const r = useR();
  const p = r.pad;
  const [hi,setHi]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setHi(i=>(i+1)%movies.length),3500);return()=>clearInterval(t);},[]);
  const hero=movies[hi];
  return (
    <div style={{paddingBottom:r.isMobile?80:100}}>
      <div style={{padding:`${p}px`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:r.isMobile?10:14}}>
          <GKLogo size={r.isMobile?44:52}/>
          <div><div style={{color:"#9ca3af",fontSize:r.isMobile?11:13,letterSpacing:1}}>WELCOME BACK</div><div style={{color:"#FFD700",fontWeight:700,fontSize:r.isMobile?16:20}}>Gidan Kallo</div></div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{background:"#27272a",borderRadius:20,padding:"4px 12px",color:"white",fontSize:12,fontWeight:700}}>HA</div>
          <div style={{background:"#27272a",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🔔</div>
          <div style={{width:34,height:34,borderRadius:"50%",border:"2px solid #a855f7",background:"#27272a",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:13}}>HA</div>
        </div>
      </div>
      <div style={{margin:`0 ${p}px`,borderRadius:r.isMobile?18:24,overflow:"hidden",position:"relative",height:r.isDesktop?380:r.isTablet?320:260}}>
        <div style={{width:"100%",height:"100%",background:hero.gradient,position:"relative"}}>
          <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
          <div style={{position:"absolute",right:r.isDesktop?40:20,top:"50%",transform:"translateY(-60%)",fontSize:r.isDesktop?200:r.isTablet?170:140,fontWeight:900,color:"rgba(255,255,255,0.07)",fontFamily:"serif",lineHeight:1,userSelect:"none"}}>{hero.posterLetter}</div>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.1) 55%,transparent 100%)"}}>
            <div style={{position:"absolute",top:12,left:12,display:"flex",alignItems:"center",gap:6,background:"rgba(0,0,0,0.55)",borderRadius:20,padding:"5px 10px"}}>
              <GKLogo size={16}/><span style={{color:"#FFD700",fontSize:9,fontWeight:700,letterSpacing:2}}>GIDAN KALLO</span>
            </div>
            <div style={{position:"absolute",top:12,right:12,background:hero.badgeColor,color:"white",fontSize:r.isMobile?10:12,fontWeight:700,padding:"3px 10px",borderRadius:6}}>{hero.badge}</div>
            <div style={{position:"absolute",bottom:r.isDesktop?96:76,left:r.isDesktop?24:14,display:"flex",gap:5}}>
              {movies.map((_,i)=><div key={i} onClick={()=>setHi(i)} style={{width:i===hi?22:6,height:6,borderRadius:3,background:i===hi?"#FFD700":"rgba(255,255,255,0.35)",cursor:"pointer",transition:"width 0.3s"}}/>)}
            </div>
            <div style={{position:"absolute",bottom:r.isDesktop?20:12,left:r.isDesktop?24:14,right:r.isDesktop?24:14}}>
              <div style={{color:"white",fontWeight:700,fontSize:r.isDesktop?28:22,lineHeight:1.2,marginBottom:4}}>{hero.title}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><Stars count={Math.floor(hero.rating)} size={r.isMobile?13:15}/><span style={{color:"#9ca3af",fontSize:r.isMobile?12:14}}>• {hero.duration} • {hero.genre}</span></div>
              <button onClick={()=>setPage("cinema")} style={{width:r.isDesktop?"auto":"100%",padding:r.isDesktop?"11px 48px":"11px",background:"white",color:"black",border:"none",borderRadius:10,fontWeight:700,fontSize:r.isMobile?14:16,cursor:"pointer"}}>🎟 Get Tickets</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{padding:`${p}px`}}>
        <div style={{color:"white",fontWeight:700,fontSize:r.isMobile?16:20,marginBottom:12}}>Quick Access</div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${r.cols.quickAccess},1fr)`,gap:r.isMobile?10:14}}>
          {[{icon:"🎬",label:"Cinema",p:"cinema"},{icon:"⚽",label:"Turf",p:"turf"},{icon:"🎮",label:"Games",p:"games"},{icon:"🍔",label:"Food",p:"food"}].map(q=>(
            <button key={q.label} onClick={()=>setPage(q.p)} style={{background:"#27272a",border:"none",borderRadius:r.isMobile?14:18,padding:r.isMobile?"14px 0":"20px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:r.isMobile?6:8,cursor:"pointer",transition:"transform 0.15s"}}>
              <span style={{fontSize:r.isMobile?24:30,lineHeight:1}}>{q.icon}</span><span style={{color:"#9ca3af",fontSize:r.isMobile?11:13}}>{q.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:`0 ${p}px ${p}px`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{color:"white",fontWeight:700,fontSize:r.isMobile?16:20}}>The Arena</span>
          <button onClick={()=>setPage("turf")} style={{color:"#22c55e",fontSize:r.isMobile?12:14,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Book Pitch</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:r.isDesktop?"1fr 1fr":"none",gap:r.isDesktop?16:0}}>
          {!r.isDesktop && <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4}}>
            {[{gradient:"linear-gradient(135deg,#0d2e0d,#1a5a1a)",badge:null,dot:"#22c55e",dotLabel:"AVAILABLE NOW",title:"5-a-Side Turf A",sub:"Starting from ₦5,000/hr",icon:"⚽"},{gradient:"linear-gradient(135deg,#1a1200,#3d2e00)",badge:{label:"TOURNAMENT",color:"#f97316"},dot:null,dotLabel:null,title:"Weekend League",sub:"Register your team",icon:"🏆"}].map((c,i)=>(
              <div key={i} onClick={()=>setPage("turf")} style={{minWidth:"65%",borderRadius:14,overflow:"hidden",position:"relative",height:140,flexShrink:0,background:c.gradient,cursor:"pointer"}}>
                <div style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:60,opacity:0.15}}>{c.icon}</div>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent)"}}>
                  {c.badge&&<div style={{position:"absolute",top:10,left:10,background:c.badge.color,color:"white",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:5}}>{c.badge.label}</div>}
                  <div style={{position:"absolute",bottom:12,left:12}}>
                    {c.dot&&<div style={{color:c.dot,fontSize:10,fontWeight:700,marginBottom:2}}>● {c.dotLabel}</div>}
                    <div style={{color:"white",fontWeight:700,fontSize:15}}>{c.title}</div>
                    <div style={{color:"#9ca3af",fontSize:12}}>{c.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>}
          {r.isDesktop && [{gradient:"linear-gradient(135deg,#0d2e0d,#1a5a1a)",badge:null,dot:"#22c55e",dotLabel:"AVAILABLE NOW",title:"5-a-Side Turf A",sub:"Starting from ₦5,000/hr",icon:"⚽"},{gradient:"linear-gradient(135deg,#1a1200,#3d2e00)",badge:{label:"TOURNAMENT",color:"#f97316"},dot:null,dotLabel:null,title:"Weekend League",sub:"Register your team",icon:"🏆"}].map((c,i)=>(
            <div key={i} onClick={()=>setPage("turf")} style={{borderRadius:18,overflow:"hidden",position:"relative",height:160,background:c.gradient,cursor:"pointer"}}>
              <div style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",fontSize:70,opacity:0.15}}>{c.icon}</div>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent)"}}>
                {c.badge&&<div style={{position:"absolute",top:12,left:12,background:c.badge.color,color:"white",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:6}}>{c.badge.label}</div>}
                <div style={{position:"absolute",bottom:16,left:16}}>
                  {c.dot&&<div style={{color:c.dot,fontSize:11,fontWeight:700,marginBottom:2}}>● {c.dotLabel}</div>}
                  <div style={{color:"white",fontWeight:700,fontSize:18}}>{c.title}</div>
                  <div style={{color:"#9ca3af",fontSize:13}}>{c.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:`0 ${p}px ${p}px`}}>
        <div onClick={()=>setPage("games")} style={{borderRadius:r.isMobile?14:18,overflow:"hidden",position:"relative",height:r.isMobile?140:170,background:"linear-gradient(135deg,#1a0520,#3d0d4e)",cursor:"pointer"}}>
          <div style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:r.isMobile?80:100,opacity:0.12}}>🎮</div>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent)"}}>
            <div style={{position:"absolute",bottom:r.isMobile?12:20,left:r.isMobile?12:20}}>
              <div style={{color:"#ec4899",fontSize:r.isMobile?10:12,fontWeight:700,marginBottom:2}}>🎮 GAME LOUNGE</div>
              <div style={{color:"white",fontWeight:700,fontSize:r.isMobile?17:20}}>Virtual Reality Zone</div>
              <div style={{color:"#9ca3af",fontSize:r.isMobile?12:14}}>PS5, VR, and Retro Arcade available.</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{padding:`0 ${p}px ${p}px`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{color:"white",fontWeight:700,fontSize:r.isMobile?16:20}}>Canteen Deals</span>
          <button onClick={()=>setPage("food")} style={{color:"#FFD700",fontSize:r.isMobile?12:14,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Order Now</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${r.cols.canteen},1fr)`,gap:12}}>
          {canteen.map(c=>(
            <div key={c.name} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:r.isMobile?14:18,overflow:"hidden"}}>
              <div style={{height:r.isMobile?90:110,background:`linear-gradient(135deg,${c.color}22,${c.color}44)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:r.isMobile?40:48}}>
                {c.name.includes("Popcorn")?"🍿":c.name.includes("Burger")?"🍔":"🥤"}
              </div>
              <div style={{padding:r.isMobile?"8px 10px":"12px 14px"}}>
                <div style={{color:"white",fontWeight:700,fontSize:r.isMobile?13:15}}>{c.name}</div>
                <div style={{color:"#9ca3af",fontSize:r.isMobile?11:12,marginTop:2}}>{c.desc}</div>
                <div style={{color:"#FFD700",fontWeight:700,fontSize:r.isMobile?13:15,marginTop:4}}>{c.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:`0 ${p}px 24px`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{color:"white",fontWeight:700,fontSize:r.isMobile?16:20}}>Customer Reviews</span>
          <span onClick={onSeeAll} style={{color:"#FFD700",fontSize:r.isMobile?12:14,cursor:"pointer",fontWeight:600}}>See All →</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:r.isDesktop?"1fr 1fr 1fr":r.isTablet?"1fr 1fr":"1fr",gap:r.isMobile?10:14}}>
        {reviews.slice(0,r.isDesktop?3:3).map((rv,i)=>(
          <div key={i} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:r.isMobile?14:18,padding:r.isMobile?14:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{background:rv.color,borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:13,flexShrink:0}}>{rv.initials}</div>
                <div><div style={{color:"white",fontWeight:700,fontSize:14,marginBottom:3}}>{rv.name}</div><Stars count={rv.rating} size={13}/></div>
              </div>
              <CategoryBadge cat={rv.category}/>
            </div>
            <div style={{color:"#9ca3af",fontSize:13,lineHeight:1.5,marginTop:4}}>{rv.text}</div>
          </div>
        ))}
        </div>
        <button onClick={onRateClick} style={{width:"100%",padding:r.isMobile?"15px":"18px",background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.25)",borderRadius:14,color:"#FFD700",fontWeight:700,fontSize:r.isMobile?15:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:r.isMobile?0:14}}>⭐ Rate Your Experience</button>
      </div>
    </div>
  );
}

function CinemaPage({ setPage, setSelected }) {
  const r = useR();
  const p = r.pad;
  const [selDay,setSelDay]=useState(0); const [selGenre,setSelGenre]=useState("All");
  const days=[["TODAY","20","Feb"],["SAT","21","Feb"],["SUN","22","Feb"],["MON","23","Feb"],["TUE","24","Feb"]];
  const genres=["All","Action","Drama","Epic"];
  const filtered=movies.filter(m=>selGenre==="All"||m.genre===selGenre);
  return (
    <div style={{paddingBottom:r.isMobile?80:100}}>
      <div style={{padding:`${p}px`,display:"flex",alignItems:"center",gap:12}}>
        <GKLogo size={r.isMobile?36:42}/><div><div style={{color:"#9ca3af",fontSize:r.isMobile?11:13}}>NOW SHOWING</div><div style={{color:"white",fontWeight:700,fontSize:r.isMobile?20:24}}>Cinema</div></div>
      </div>
      <div style={{display:"flex",gap:8,padding:`0 ${p}px`,overflowX:"auto",paddingBottom:8}}>
        {days.map((d,i)=>(
          <button key={i} onClick={()=>setSelDay(i)} style={{minWidth:r.isMobile?56:68,padding:r.isMobile?"8px":"10px",borderRadius:12,border:"none",cursor:"pointer",background:selDay===i?"#FFD700":"#27272a",display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
            <span style={{fontSize:r.isMobile?9:10,color:selDay===i?"#000":"#9ca3af",fontWeight:600}}>{d[0]}</span>
            <span style={{fontSize:r.isMobile?18:20,fontWeight:700,color:selDay===i?"#000":"white",lineHeight:1.2}}>{d[1]}</span>
            <span style={{fontSize:r.isMobile?9:10,color:selDay===i?"#000":"#9ca3af"}}>{d[2]}</span>
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:8,padding:`12px ${p}px`,overflowX:"auto"}}>
        {genres.map(g=><button key={g} onClick={()=>setSelGenre(g)} style={{padding:r.isMobile?"6px 16px":"8px 20px",borderRadius:20,border:"none",cursor:"pointer",background:selGenre===g?"#a855f7":"#27272a",color:selGenre===g?"white":"#9ca3af",fontWeight:600,fontSize:r.isMobile?13:14,whiteSpace:"nowrap",flexShrink:0}}>{g}</button>)}
      </div>
      <div style={{padding:`0 ${p}px`,display:"grid",gridTemplateColumns:r.isDesktop?"1fr 1fr":r.isTablet?"1fr 1fr":"1fr",gap:r.isMobile?14:16}}>
        {filtered.map(m=>(
          <div key={m.id} onClick={()=>{setSelected(m);setPage("movie");}} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:r.isMobile?16:20,overflow:"hidden",cursor:"pointer"}}>
            <div style={{display:"flex",gap:12,padding:r.isMobile?12:16}}>
              <div style={{position:"relative",flexShrink:0}}>
                <div style={{width:r.isMobile?80:100,height:r.isMobile?110:140,borderRadius:r.isMobile?10:14,background:m.gradient,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",position:"relative"}}>
                  <span style={{fontSize:r.isMobile?48:60,fontWeight:900,color:"rgba(255,255,255,0.15)",fontFamily:"serif"}}>{m.posterLetter}</span>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.5))"}}/>
                </div>
                <div style={{position:"absolute",top:4,left:4,background:m.badgeColor,color:"white",fontSize:r.isMobile?8:9,fontWeight:700,padding:"2px 5px",borderRadius:4,lineHeight:1.3}}>{m.badge}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"white",fontWeight:700,fontSize:16,marginBottom:2}}>{m.title}</div>
                <div style={{color:"#FFD700",fontSize:12,fontStyle:"italic",marginBottom:4}}>"{m.sub}"</div>
                <div style={{color:"#9ca3af",fontSize:12}}>{m.genre} • {m.duration}</div>
                <div style={{color:"#9ca3af",fontSize:12,marginBottom:4}}>{m.lang}</div>
                <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:8}}><Stars count={Math.floor(m.rating)} size={12}/><span style={{color:"#9ca3af",fontSize:12}}>{m.rating}</span></div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {m.showtimes.map(s=><span key={s.time} style={{padding:"3px 7px",borderRadius:7,background:s.type==="IMAX"?"#FFD700":"#27272a",color:s.type==="IMAX"?"#000":"#9ca3af",fontSize:11,fontWeight:s.type==="IMAX"?700:400}}>{s.time} {s.type}</span>)}
                </div>
              </div>
            </div>
            <div style={{borderTop:"1px solid #27272a",padding:"10px 12px"}}>
              <button style={{width:"100%",padding:"10px",background:"#27272a",border:"1px solid #FFD700",borderRadius:10,color:"#FFD700",fontWeight:700,fontSize:13,cursor:"pointer"}}>🎟 Buy Ticket • {m.dome}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieDetailPage({ movie, setPage, onBook }) {
  const [selST, setSelST] = useState(null);
  if (!movie) return null;
  return (
    <div style={{paddingBottom:100}}>
      <div style={{position:"relative",height:260}}>
        <div style={{width:"100%",height:"100%",background:movie.gradient,position:"relative"}}>
          <div style={{position:"absolute",right:20,top:"30%",fontSize:160,fontWeight:900,color:"rgba(255,255,255,0.06)",fontFamily:"serif",lineHeight:1}}>{movie.posterLetter}</div>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.2),#09090b)"}}/>
          <button onClick={()=>setPage("cinema")} style={{position:"absolute",top:16,left:16,background:"rgba(0,0,0,0.55)",border:"none",borderRadius:"50%",width:36,height:36,color:"white",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <div style={{position:"absolute",top:16,right:16,background:movie.badgeColor,color:"white",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:8}}>{movie.badge}</div>
        </div>
      </div>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{color:"white",fontWeight:700,fontSize:24,marginTop:-16,position:"relative",marginBottom:4}}>{movie.title}</div>
        <div style={{color:"#FFD700",fontSize:13,fontStyle:"italic",marginBottom:8}}>"{movie.sub}"</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>{[movie.duration,movie.genre,movie.lang].map((v,i)=><span key={i} style={{color:"#9ca3af",fontSize:13}}>{i>0?"• ":""}{v}</span>)}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:18}}><Stars count={Math.floor(movie.rating)} size={14}/><span style={{color:"#9ca3af",fontSize:13}}>{movie.rating}</span></div>
        <div style={{color:"#6b7280",fontSize:11,letterSpacing:2,fontWeight:700,marginBottom:10}}>AVAILABLE SHOWTIMES</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12}}>
          {movie.showtimes.map(s=>(
            <div key={s.time} onClick={()=>setSelST(s)} style={{padding:"10px 16px",borderRadius:12,background:selST?.time===s.time?"#FFD700":s.type==="IMAX"?"#a855f7":"#27272a",border:"1px solid #374151",textAlign:"center",minWidth:70,cursor:"pointer"}}>
              <div style={{color:selST?.time===s.time?"#000":"white",fontWeight:700,fontSize:17,lineHeight:1}}>{s.time}</div>
              <div style={{color:selST?.time===s.time?"#333":"#9ca3af",fontSize:11,marginTop:4}}>{s.type}</div>
            </div>
          ))}
        </div>
        <div style={{color:"#9ca3af",fontSize:13,marginBottom:20}}>Playing at: <span style={{background:"#27272a",padding:"2px 8px",borderRadius:6,color:"#FFD700",fontWeight:600}}>{movie.dome}</span>{"  "}• ₦{movie.price.toLocaleString()}/seat</div>
        <button onClick={()=>selST&&onBook(movie,selST)} style={{width:"100%",padding:"16px",background:selST?"#FFD700":"#27272a",color:selST?"#000":"#4b5563",border:"none",borderRadius:14,fontWeight:700,fontSize:16,cursor:selST?"pointer":"default"}}>
          {selST?"🎟 Select Seats & Buy Ticket":"Select a showtime first"}
        </button>
      </div>
    </div>
  );
}

// Cinema checkout pages (condensed from Phase 2)
function SeatPage({ movie, showtime, onBack, onContinue }) {
  const rows=["A","B","C","D","E","F","G","H"]; const cols={A:9,B:9,C:10,D:10,E:11,F:11,G:12,H:12};
  const vipRows=["A","B"]; const taken=["A1","A2","A4","A5","A6","A8","B1","B3","B4","B6","B7","B8","E2","F2","G1","G2","G3","G4"];
  const [selected,setSelected]=useState([]);
  const toggle=s=>{if(taken.includes(s))return;setSelected(p=>p.includes(s)?p.filter(x=>x!==s):p.length>=6?p:[...p,s]);};
  const isVip=r=>vipRows.includes(r); const pricePerSeat=r=>isVip(r)?3000:movie.price;
  const total=selected.reduce((s,seat)=>s+pricePerSeat(seat[0]),0);
  return (
    <div style={{paddingBottom:160,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:16}}>Checkout</div><div style={{color:"#9ca3af",fontSize:12}}>{movie.title} • {showtime.time} • {movie.dome}</div></div>
        <GKLogo size={34}/>
      </div>
      <CheckoutProgress step={0}/>
      <div style={{margin:"0 16px 16px",background:"#18181b",borderRadius:16,padding:"16px",border:"1px solid #27272a"}}>
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{height:4,background:"linear-gradient(to right,transparent,#FFD700,transparent)",borderRadius:2,marginBottom:6}}/>
          <span style={{color:"#9ca3af",fontSize:11,letterSpacing:2,fontWeight:600}}>SCREEN • {movie.dome.toUpperCase()}</span>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:14}}>
          {[{color:"#374151",label:"Free"},{color:"#FFD700",label:"Yours"},{color:"#4a4a4a",label:"Taken"},{color:"#7f1d1d",label:"VIP 👑"}].map(l=>(
            <div key={l.label} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:12,height:12,borderRadius:3,background:l.color}}/><span style={{color:"#9ca3af",fontSize:10}}>{l.label}</span></div>
          ))}
        </div>
        <div style={{overflowX:"auto"}}>
          {rows.map(r=>(
            <div key={r} style={{display:"flex",alignItems:"center",gap:4,marginBottom:5,justifyContent:"center"}}>
              <span style={{color:"#6b7280",fontSize:10,width:12,textAlign:"center",flexShrink:0}}>{r}</span>
              {Array.from({length:cols[r]},(_,i)=>{
                const sid=`${r}${i+1}`; const isTaken=taken.includes(sid); const isSel=selected.includes(sid); const vip=isVip(r);
                return <div key={sid} onClick={()=>toggle(sid)} style={{width:22,height:22,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,cursor:isTaken?"not-allowed":"pointer",flexShrink:0,background:isSel?"#FFD700":isTaken?(vip?"#7f1d1d":"#2d2d2d"):vip?"rgba(127,29,29,0.4)":"#27272a",color:isSel?"#000":isTaken?"#555":"#9ca3af",border:vip&&!isTaken?"1px solid rgba(239,68,68,0.4)":"none"}}>{isSel?"✓":i+1}</div>;
              })}
            </div>
          ))}
        </div>
      </div>
      {selected.length>0&&(
        <div style={{margin:"0 16px",background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            {selected.map(s=><span key={s} style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.3)",color:"#FFD700",padding:"3px 7px",borderRadius:5,fontSize:12,fontWeight:700}}>{s}{isVip(s[0])?" 👑":""}</span>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid #27272a",paddingTop:8}}>
            <span style={{color:"#9ca3af",fontSize:13}}>Ticket subtotal</span>
            <span style={{color:"#FFD700",fontWeight:700,fontSize:15}}>₦{total.toLocaleString()}</span>
          </div>
        </div>
      )}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        {selected.length===0
          ?<div style={{textAlign:"center",padding:"16px",background:"#18181b",border:"1px solid #374151",borderRadius:14,color:"#6b7280",fontSize:14}}>📍 Select a seat to continue</div>
          :<><button onClick={()=>onContinue(selected)} style={{width:"100%",padding:"16px",background:"#FFD700",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:"#000",cursor:"pointer",marginBottom:8}}>Continue to Snacks →</button>
            <button onClick={()=>onContinue(selected,"skip")} style={{width:"100%",padding:"10px",background:"none",border:"none",color:"#9ca3af",fontSize:14,cursor:"pointer"}}>Skip snacks →</button></>
        }
      </div>
    </div>
  );
}

function SnacksPage({ movie, showtime, seats, onBack, onContinue }) {
  const [qty,setQty]=useState({});
  const vipRows=["A","B"]; const ticketTotal=seats.reduce((s,seat)=>s+(vipRows.includes(seat[0])?3000:movie.price),0);
  const snackTotal=snackItems.reduce((s,i)=>s+(qty[i.id]||0)*i.price,0); const sc=Math.round((ticketTotal+snackTotal)*0.015);
  const change=(id,d)=>setQty(q=>({...q,[id]:Math.max(0,(q[id]||0)+d)}));
  return (
    <div style={{paddingBottom:200,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:16}}>Snacks & Refreshments</div><div style={{color:"#9ca3af",fontSize:12}}>Pre-order & skip the queue</div></div>
        <GKLogo size={34}/>
      </div>
      <CheckoutProgress step={1}/>
      <div style={{padding:"0 16px 0"}}>
        {snackItems.map(item=>(
          <div key={item.id} style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14,marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:32,flexShrink:0}}>{item.icon}</span>
            <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:15}}>{item.name}</div><div style={{color:"#9ca3af",fontSize:12,marginTop:2}}>{item.desc}</div><div style={{color:"#FFD700",fontWeight:700,fontSize:14,marginTop:4}}>₦{item.price.toLocaleString()}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
              <button onClick={()=>change(item.id,-1)} style={{width:32,height:32,borderRadius:"50%",background:"#27272a",border:"1px solid #374151",color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{color:"white",fontWeight:700,fontSize:16,minWidth:16,textAlign:"center"}}>{qty[item.id]||0}</span>
              <button onClick={()=>change(item.id,1)} style={{width:32,height:32,borderRadius:"50%",background:"#7a6500",border:"none",color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{margin:"8px 16px",background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#9ca3af",fontSize:13}}>{seats.length}× Ticket{seats.length>1?"s":""}</span><span style={{color:"white",fontSize:13}}>₦{ticketTotal.toLocaleString()}</span></div>
        {snackItems.filter(i=>(qty[i.id]||0)>0).map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#9ca3af",fontSize:13}}>{qty[i.id]}× {i.name}</span><span style={{color:"white",fontSize:13}}>₦{(qty[i.id]*i.price).toLocaleString()}</span></div>)}
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{color:"#9ca3af",fontSize:13}}>Service (1.5%)</span><span style={{color:"#9ca3af",fontSize:13}}>₦{sc.toLocaleString()}</span></div>
        <div style={{borderTop:"1px solid #374151",paddingTop:8,display:"flex",justifyContent:"space-between"}}><span style={{color:"white",fontWeight:700}}>Total</span><span style={{color:"#FFD700",fontWeight:700,fontSize:18}}>₦{(ticketTotal+snackTotal+sc).toLocaleString()}</span></div>
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        <button onClick={()=>onContinue(qty)} style={{width:"100%",padding:"16px",background:"#FFD700",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:"#000",cursor:"pointer"}}>Continue →</button>
      </div>
    </div>
  );
}

function DetailsPage({ movie, showtime, seats, snacks, onBack, onContinue }) {
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [email,setEmail]=useState("");
  const vipRows=["A","B"]; const tt=seats.reduce((s,seat)=>s+(vipRows.includes(seat[0])?3000:movie.price),0);
  const st=snackItems.reduce((s,i)=>s+(snacks[i.id]||0)*i.price,0); const sc=Math.round((tt+st)*0.015); const total=tt+st+sc;
  const ok=name.trim()&&phone.trim().length>=8;
  return (
    <div style={{paddingBottom:120,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:16}}>Your Details</div></div><GKLogo size={34}/>
      </div>
      <CheckoutProgress step={2}/>
      <div style={{padding:"0 16px"}}>
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:20}}>👤</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/></div>
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:14,color:"white",fontWeight:600}}>🇳🇬 +234</span><div style={{width:1,height:20,background:"#374151"}}/><input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} placeholder="Phone number" type="tel" style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/></div>
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:"14px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:20}}>✉️</span><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)" style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",fontFamily:"inherit"}}/></div>
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
            <span style={{background:"#27272a",color:"#FFD700",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:600}}>🎬 {movie.title}</span>
            <span style={{background:"#27272a",color:"white",padding:"4px 10px",borderRadius:8,fontSize:12}}>⏰ {showtime.time}</span>
            {seats.map(s=><span key={s} style={{background:"#27272a",color:"white",padding:"4px 10px",borderRadius:8,fontSize:12}}>{s}</span>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid #374151",paddingTop:10}}><span style={{color:"#9ca3af",fontSize:13}}>Total</span><span style={{color:"#FFD700",fontWeight:700,fontSize:18}}>₦{total.toLocaleString()}</span></div>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        <button onClick={()=>ok&&onContinue({name,phone,email})} style={{width:"100%",padding:"16px",background:ok?"#FFD700":"#27272a",border:"none",borderRadius:14,fontWeight:700,fontSize:16,color:ok?"#000":"#4b5563",cursor:ok?"pointer":"default"}}>Proceed to Payment →</button>
      </div>
    </div>
  );
}

function PaymentPage({ movie, showtime, seats, snacks, customer, onBack, onPay }) {
  const [method,setMethod]=useState("card");
  const vipRows=["A","B"]; const tt=seats.reduce((s,seat)=>s+(vipRows.includes(seat[0])?3000:movie.price),0);
  const st=snackItems.reduce((s,i)=>s+(snacks[i.id]||0)*i.price,0); const sc=Math.round((tt+st)*0.015); const total=tt+st+sc;
  const methods=[{id:"card",icon:"💳",label:"Card Payment"},{id:"transfer",icon:"🏦",label:"Bank Transfer"},{id:"ussd",icon:"📱",label:"USSD"},{id:"cash",icon:"💵",label:"Pay at Counter"}];
  return (
    <div style={{paddingBottom:120,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:16}}>Payment</div></div><GKLogo size={34}/>
      </div>
      <CheckoutProgress step={3}/>
      <div style={{padding:"0 16px"}}>
        <div style={{background:"linear-gradient(135deg,#1a1200,#3d2e00)",border:"1px solid rgba(255,215,0,0.3)",borderRadius:16,padding:16,marginBottom:16,textAlign:"center"}}>
          <div style={{color:"#9ca3af",fontSize:12,marginBottom:4}}>AMOUNT DUE</div>
          <div style={{color:"#FFD700",fontWeight:900,fontSize:36}}>₦{total.toLocaleString()}</div>
          <div style={{color:"#9ca3af",fontSize:12,marginTop:4}}>for {customer.name}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {methods.map(m=>(
            <button key={m.id} onClick={()=>setMethod(m.id)} style={{padding:"14px",borderRadius:14,border:`2px solid ${method===m.id?"#FFD700":"#374151"}`,background:method===m.id?"rgba(255,215,0,0.08)":"#18181b",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:4}}>{m.icon}</div>
              <div style={{color:method===m.id?"#FFD700":"#9ca3af",fontSize:12,fontWeight:600}}>{m.label}</div>
            </button>
          ))}
        </div>
        <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,padding:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#9ca3af",fontSize:13}}>{seats.length}× Ticket{seats.length>1?"s":""}</span><span style={{color:"white",fontSize:13}}>₦{tt.toLocaleString()}</span></div>
          {snackItems.filter(i=>(snacks[i.id]||0)>0).map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#9ca3af",fontSize:13}}>{snacks[i.id]}× {i.name}</span><span style={{color:"white",fontSize:13}}>₦{(snacks[i.id]*i.price).toLocaleString()}</span></div>)}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{color:"#9ca3af",fontSize:13}}>Service (1.5%)</span><span style={{color:"#9ca3af",fontSize:13}}>₦{sc.toLocaleString()}</span></div>
          <div style={{borderTop:"1px solid #374151",paddingTop:8,display:"flex",justifyContent:"space-between"}}><span style={{color:"white",fontWeight:700}}>Total Paid</span><span style={{color:"#FFD700",fontWeight:700,fontSize:18}}>₦{total.toLocaleString()}</span></div>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:700,padding:"12px 16px 24px",background:"linear-gradient(to top,#09090b,#09090b 70%,transparent)",zIndex:40}}>
        <button onClick={()=>onPay(method,total)} style={{width:"100%",padding:"16px",background:"#FFD700",border:"none",borderRadius:14,fontWeight:700,fontSize:17,color:"#000",cursor:"pointer"}}>
          {method==="cash"?"Confirm Booking":"Pay ₦"+total.toLocaleString()} →
        </button>
      </div>
    </div>
  );
}

function TicketPage({ movie, showtime, seats, snacks, customer, total, onHome }) {
  const ref="GK-"+Date.now().toString(36).toUpperCase().slice(-6);
  const snackList=snackItems.filter(i=>(snacks[i.id]||0)>0); const vipRows=["A","B"];
  return (
    <div style={{paddingBottom:80,background:"#09090b",minHeight:"100vh"}}>
      <div style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onHome} style={{background:"#27272a",border:"none",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
        <div style={{flex:1}}><div style={{color:"white",fontWeight:700,fontSize:16}}>Your Ticket</div><div style={{color:"#22c55e",fontSize:12,fontWeight:600}}>✓ Payment Confirmed</div></div>
        <button style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.3)",borderRadius:20,padding:"6px 12px",color:"#FFD700",fontSize:12,fontWeight:700,cursor:"pointer"}}>📤 Share</button>
      </div>
      <div style={{padding:"0 16px"}}>
        <div style={{background:"linear-gradient(to right,rgba(34,197,94,0.15),rgba(34,197,94,0.05))",border:"1px solid rgba(34,197,94,0.3)",borderRadius:16,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(34,197,94,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>✅</div>
          <div><div style={{color:"white",fontWeight:700,fontSize:15}}>Booking Confirmed!</div><div style={{color:"#9ca3af",fontSize:12,marginTop:2}}>Ref: <span style={{color:"#22c55e",fontFamily:"monospace",fontWeight:700}}>{ref}</span></div></div>
        </div>
        <div style={{background:"#18181b",borderRadius:20,overflow:"hidden",border:"1px solid #27272a",marginBottom:16}}>
          <div style={{height:100,background:movie.gradient,position:"relative",display:"flex",alignItems:"flex-end",padding:"12px"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent,rgba(0,0,0,0.6))"}}/>
            <div style={{position:"absolute",top:8,right:8}}><GKLogo size={28}/></div>
            <div style={{position:"relative"}}><div style={{color:"white",fontWeight:700,fontSize:20}}>{movie.title}</div><div style={{color:"#FFD700",fontSize:12}}>{showtime.time} • {movie.dome} • {showtime.type}</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center"}}><div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/><div style={{flex:1,borderTop:"2px dashed #374151"}}/><div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/></div>
          <div style={{padding:"14px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:6}}>SEATS</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{seats.map(s=><span key={s} style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.3)",color:"#FFD700",padding:"3px 7px",borderRadius:5,fontSize:12,fontWeight:700}}>{s}{vipRows.includes(s[0])?" 👑":""}</span>)}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:6}}>GUESTS</div><div style={{color:"white",fontWeight:700,fontSize:22}}>{seats.length}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:6}}>CUSTOMER</div><div style={{color:"white",fontWeight:600,fontSize:14}}>{customer.name}</div></div>
            <div><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:6}}>AMOUNT PAID</div><div style={{color:"#FFD700",fontWeight:700,fontSize:15}}>₦{total.toLocaleString()}</div></div>
          </div>
          {snackList.length>0&&<div style={{padding:"0 16px 14px"}}><div style={{color:"#6b7280",fontSize:10,letterSpacing:1,marginBottom:6}}>ADD-ONS</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{snackList.map(s=><span key={s.id} style={{background:"#27272a",color:"#9ca3af",padding:"3px 8px",borderRadius:6,fontSize:11}}>{snacks[s.id]}× {s.name}</span>)}</div></div>}
          <div style={{display:"flex",alignItems:"center"}}><div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginLeft:-10,flexShrink:0}}/><div style={{flex:1,borderTop:"2px dashed #374151"}}/><div style={{width:20,height:20,borderRadius:"50%",background:"#09090b",marginRight:-10,flexShrink:0}}/></div>
          <div style={{padding:"16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{background:"white",padding:12,borderRadius:14}}>
              <svg width={140} height={140} viewBox="0 0 140 140">
                {Array.from({length:14},(_,r)=>Array.from({length:14},(_,c)=>{const h=(ref.charCodeAt(r%ref.length)*37+c*53+r*17)%97;const fill=h>45||((r<4&&c<4)||(r<4&&c>9)||(r>9&&c<4));return fill?<rect key={`${r}${c}`} x={c*10} y={r*10} width={10} height={10} fill="#000"/>:null;}))}
                <rect x={55} y={55} width={30} height={30} fill="white" rx={4}/><text x={70} y={73} textAnchor="middle" fontSize={14} fontWeight={900} fill="#000">GK</text>
              </svg>
            </div>
            <div style={{color:"#FFD700",fontFamily:"monospace",fontSize:13,fontWeight:700,marginTop:8,background:"rgba(255,215,0,0.08)",padding:"4px 12px",borderRadius:8,border:"1px solid rgba(255,215,0,0.2)"}}>{ref}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <button style={{padding:"13px",background:"#18181b",border:"1px solid #27272a",borderRadius:12,color:"white",fontSize:13,fontWeight:600,cursor:"pointer"}}>📤 Share</button>
          <button style={{padding:"13px",background:"rgba(255,215,0,0.08)",border:"1px solid rgba(255,215,0,0.3)",borderRadius:12,color:"#FFD700",fontSize:13,fontWeight:600,cursor:"pointer"}}>🎟 Book More</button>
        </div>
        <button onClick={onHome} style={{width:"100%",padding:"15px",background:"#FFD700",border:"none",borderRadius:14,fontWeight:700,fontSize:15,color:"#000",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>🏠 Back to Home</button>
      </div>
    </div>
  );
}

// ── ROOT ──
export default function App() {
  const r = useResponsive();
  const [page, setPage] = useState("home");
  const [selMov, setSelMov] = useState(null);
  const [cinemaBooking, setCinemaBooking] = useState({movie:null,showtime:null,seats:[],snacks:{},customer:null,total:0});
  const [turfBooking, setTurfBooking] = useState(null);
  const [turfCustomer, setTurfCustomer] = useState(null);
  const [gamesBooking, setGamesBooking] = useState(null);
  const [gamesCustomer, setGamesCustomer] = useState(null);
  const [modal, setModal] = useState(false);
  const [reviews, setReviews] = useState(allReviews);
  const [foodCart, setFoodCart] = useState({});
  const [foodTotal, setFoodTotal] = useState(0);
  const [foodCustomer, setFoodCustomer] = useState(null);

  const handleReview = ({service,name,rating,text}) => {
    const initials=name.trim().split(" ").map(w=>w[0]||"").join("").toUpperCase().slice(0,2);
    const colors=["#3b82f6","#10b981","#a855f7","#ec4899","#f97316","#eab308"];
    setReviews(r=>[{name,initials,color:colors[Math.floor(Math.random()*colors.length)],rating,text,category:service,when:"Just now"},...r]);
    setModal(false); setPage("reviews");
  };

  return (
    <RCtx.Provider value={r}>
      <div style={{
        width:"100%",
        maxWidth: r.isMobile ? 430 : "100%",
        margin:"0 auto",
        background:"#09090b",
        minHeight:"100vh",
        fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        color:"white",
        position:"relative",
        overflowX:"hidden",
      }}>
        {page==="home"         && <HomePage setPage={setPage} reviews={reviews} onRateClick={()=>setModal(true)} onSeeAll={()=>setPage("reviews")}/>}
        {page==="cinema"       && <CinemaPage setPage={setPage} setSelected={setSelMov}/>}
        {page==="movie"        && <MovieDetailPage movie={selMov} setPage={setPage} onBook={(m,s)=>{setCinemaBooking(b=>({...b,movie:m,showtime:s}));setPage("seats");}}/>}
        {page==="seats"        && <SeatPage movie={cinemaBooking.movie} showtime={cinemaBooking.showtime} onBack={()=>setPage("movie")} onContinue={(seats,skip)=>{setCinemaBooking(b=>({...b,seats}));setPage(skip?"details":"snacks");}}/>}
        {page==="snacks"       && <SnacksPage movie={cinemaBooking.movie} showtime={cinemaBooking.showtime} seats={cinemaBooking.seats} onBack={()=>setPage("seats")} onContinue={snacks=>{setCinemaBooking(b=>({...b,snacks}));setPage("details");}}/>}
        {page==="details"      && <DetailsPage movie={cinemaBooking.movie} showtime={cinemaBooking.showtime} seats={cinemaBooking.seats} snacks={cinemaBooking.snacks} onBack={()=>setPage("snacks")} onContinue={customer=>{setCinemaBooking(b=>({...b,customer}));setPage("payment");}}/>}
        {page==="payment"      && <PaymentPage movie={cinemaBooking.movie} showtime={cinemaBooking.showtime} seats={cinemaBooking.seats} snacks={cinemaBooking.snacks} customer={cinemaBooking.customer} onBack={()=>setPage("details")} onPay={(method,total)=>{setCinemaBooking(b=>({...b,total}));setPage("ticket");}}/>}
        {page==="ticket"       && <TicketPage movie={cinemaBooking.movie} showtime={cinemaBooking.showtime} seats={cinemaBooking.seats} snacks={cinemaBooking.snacks} customer={cinemaBooking.customer} total={cinemaBooking.total} onHome={()=>setPage("home")}/>}
        {page==="turf"         && <TurfPage setPage={setPage} onBook={b=>{setTurfBooking(b);setPage("turf-book");}}/>}
        {page==="turf-book"    && <TurfBookingPage booking={turfBooking} onBack={()=>setPage("turf")} onConfirm={c=>{setTurfCustomer(c);setPage("turf-confirm");}}/>}
        {page==="turf-confirm" && <TurfConfirmPage booking={turfBooking} customer={turfCustomer} onHome={()=>setPage("home")}/>}
        {page==="games"        && <GamesPage setPage={setPage} onBook={b=>{setGamesBooking(b);setPage("games-book");}}/>}
        {page==="games-book"   && <GamesBookingPage booking={gamesBooking} onBack={()=>setPage("games")} onConfirm={c=>{setGamesCustomer(c);setPage("games-confirm");}}/>}
        {page==="games-confirm"&& <GamesConfirmPage booking={gamesBooking} customer={gamesCustomer} onHome={()=>setPage("home")}/>}
        {page==="reviews"      && <ReviewsPage reviews={reviews} onBack={()=>setPage("home")} onWrite={()=>setModal(true)}/>}
        {page==="food"         && <FoodPage setPage={setPage} cart={foodCart} setCart={setFoodCart}/>}
        {page==="food-cart"    && <FoodCartPage cart={foodCart} setCart={setFoodCart} onBack={()=>setPage("food")} onCheckout={total=>{setFoodTotal(total);setPage("food-checkout");}}/>}
        {page==="food-checkout"&& <FoodCheckoutPage cart={foodCart} total={foodTotal} onBack={()=>setPage("food-cart")} onConfirm={c=>{setFoodCustomer(c);setPage("food-confirm");}}/>}
        {page==="food-confirm" && <FoodConfirmPage cart={foodCart} total={foodTotal} customer={foodCustomer} onHome={()=>{setFoodCart({});setPage("home");}}/>}
        {modal && <ReviewModal onClose={()=>setModal(false)} onSubmit={handleReview}/>}
        <Nav page={page} setPage={setPage}/>
      </div>
    </RCtx.Provider>
  );
}
