"use client";

import { FormEvent, useMemo, useState } from "react";

type Profile = {
  sex: "female" | "male";
  goal: "maintain" | "loss";
  age: number;
  weight: number;
  target: number;
  height: number;
  activity: number;
};

type Food = { name: string; category: string; kcal: number; gi: number; note: string };

const foods: Food[] = [
  { name: "Concombre, cru", category: "Légumes", kcal: 15, gi: 15, note: "Avec la peau" },
  { name: "Laitue", category: "Légumes", kcal: 15, gi: 15, note: "Toutes variétés" },
  { name: "Courgette", category: "Légumes", kcal: 17, gi: 15, note: "Crue ou vapeur" },
  { name: "Tomate", category: "Légumes", kcal: 18, gi: 15, note: "Fraîche" },
  { name: "Radis", category: "Légumes", kcal: 18, gi: 15, note: "Cru" },
  { name: "Asperge", category: "Légumes", kcal: 20, gi: 15, note: "Vapeur" },
  { name: "Poivron", category: "Légumes", kcal: 20, gi: 15, note: "Cru" },
  { name: "Épinard", category: "Légumes", kcal: 23, gi: 15, note: "Cuit sans matière grasse" },
  { name: "Chou-fleur", category: "Légumes", kcal: 25, gi: 15, note: "Vapeur" },
  { name: "Aubergine", category: "Légumes", kcal: 25, gi: 20, note: "Rôtie sans friture" },
  { name: "Chou blanc", category: "Légumes", kcal: 25, gi: 15, note: "Cru" },
  { name: "Citron", category: "Fruits", kcal: 29, gi: 20, note: "Fruit entier" },
  { name: "Haricot vert", category: "Légumes", kcal: 31, gi: 30, note: "Cuit" },
  { name: "Brocoli", category: "Légumes", kcal: 34, gi: 15, note: "Vapeur" },
  { name: "Carotte crue", category: "Légumes", kcal: 36, gi: 16, note: "Râpée ou entière" },
  { name: "Fraise", category: "Fruits", kcal: 38, gi: 25, note: "Fraîche" },
  { name: "Pamplemousse", category: "Fruits", kcal: 42, gi: 25, note: "Fruit entier" },
  { name: "Framboise", category: "Fruits", kcal: 46, gi: 25, note: "Fraîche" },
  { name: "Lait demi-écrémé", category: "Laitages", kcal: 47, gi: 31, note: "Nature" },
  { name: "Orange", category: "Fruits", kcal: 47, gi: 35, note: "Entière, pas en jus" },
  { name: "Abricot", category: "Fruits", kcal: 48, gi: 34, note: "Frais" },
  { name: "Pêche", category: "Fruits", kcal: 50, gi: 28, note: "Fraîche" },
  { name: "Pomme", category: "Fruits", kcal: 52, gi: 34, note: "Avec la peau" },
  { name: "Yaourt nature 0 %", category: "Laitages", kcal: 56, gi: 27, note: "Sans sucre ajouté" },
  { name: "Poire", category: "Fruits", kcal: 57, gi: 30, note: "Avec la peau" },
  { name: "Prune", category: "Fruits", kcal: 59, gi: 24, note: "Fraîche" },
  { name: "Yaourt nature entier", category: "Laitages", kcal: 61, gi: 35, note: "Sans sucre ajouté" },
  { name: "Cerise", category: "Fruits", kcal: 63, gi: 22, note: "Fraîche" },
  { name: "Grenade", category: "Fruits", kcal: 83, gi: 35, note: "Arilles entières" },
  { name: "Vermicelles de soja", category: "Céréales", kcal: 109, gi: 35, note: "Cuits" },
  { name: "Lentilles vertes", category: "Légumineuses", kcal: 116, gi: 30, note: "Cuites" },
  { name: "Pois cassés", category: "Légumineuses", kcal: 118, gi: 25, note: "Cuits" },
  { name: "Orge perlé", category: "Céréales", kcal: 123, gi: 28, note: "Cuit al dente" },
  { name: "Haricots rouges", category: "Légumineuses", kcal: 127, gi: 24, note: "Cuits" },
  { name: "Haricots noirs", category: "Légumineuses", kcal: 132, gi: 30, note: "Cuits" },
  { name: "Pois chiches", category: "Légumineuses", kcal: 139, gi: 28, note: "Cuits" },
  { name: "Haricots blancs", category: "Légumineuses", kcal: 139, gi: 31, note: "Cuits" },
  { name: "Soja edamame", category: "Légumineuses", kcal: 140, gi: 18, note: "Cuit" },
  { name: "Seigle en grains", category: "Céréales", kcal: 141, gi: 34, note: "Cuit" },
  { name: "Avocat", category: "Fruits", kcal: 160, gi: 15, note: "Lipides majoritairement insaturés" },
  { name: "Houmous", category: "Légumineuses", kcal: 166, gi: 6, note: "Sans sucre ajouté" },
  { name: "Pruneau", category: "Fruits", kcal: 240, gi: 29, note: "Petite portion" },
  { name: "Abricot sec", category: "Fruits", kcal: 241, gi: 30, note: "Petite portion" },
  { name: "Noix de cajou", category: "Oléagineux", kcal: 553, gi: 25, note: "Non salées" },
  { name: "Pistaches", category: "Oléagineux", kcal: 562, gi: 15, note: "Non salées" },
  { name: "Amandes", category: "Oléagineux", kcal: 579, gi: 15, note: "Nature" },
  { name: "Beurre de cacahuète", category: "Oléagineux", kcal: 588, gi: 14, note: "100 % cacahuètes" },
  { name: "Chocolat noir ≥ 85 %", category: "Plaisir", kcal: 598, gi: 23, note: "10–20 g, sans excès" },
].sort((a, b) => a.kcal - b.kcal);

const menus = [
  ["Porridge d’orge, yaourt nature, pomme, cannelle", "Poire + 10 amandes", "Poulet citron, lentilles, brocoli", "Yaourt nature + framboises", "Cabillaud, ratatouille, pois chiches"],
  ["Omelette épinards, pain intégral au levain, orange", "Pomme + noix", "Saumon, haricots verts, orge perlé", "Fromage blanc + fraises", "Soupe de légumes, tofu grillé, lentilles"],
  ["Yaourt grec nature, fruits rouges, graines de chia", "Pêche + pistaches", "Dinde aux herbes, haricots rouges, crudités", "Houmous + bâtonnets de concombre", "Crevettes, courgettes, vermicelles de soja"],
  ["Tartine de seigle, avocat, œuf poché, tomate", "Pamplemousse + amandes", "Bowl de pois chiches, aubergine, feta, roquette", "Yaourt nature + cerises", "Poulet au paprika, chou-fleur, lentilles"],
  ["Fromage blanc, poire, son d’avoine, cannelle", "Abricot + noix", "Thon, haricots blancs, tomate, concombre", "Pomme + beurre de cacahuète 100 %", "Omelette aux champignons, salade croquante"],
  ["Œufs brouillés, tomate, avocat, tranche de seigle", "Yaourt nature + fraises", "Tofu au gingembre, edamame, légumes verts", "Poire + 10 amandes", "Truite, poireaux, pois cassés"],
  ["Pudding chia-soja, framboises, amandes", "Pomme + yaourt nature", "Bœuf maigre, ratatouille, haricots rouges", "Houmous + radis", "Merlu, brocoli, orge perlé"],
  ["Yaourt nature, pomme, noix, cannelle", "Orange + pistaches", "Sardines, salade de lentilles et crudités", "Fromage blanc + pêche", "Dinde au curry, chou-fleur, pois chiches"],
  ["Omelette aux herbes, avocat, pamplemousse", "Poire + amandes", "Chili végétarien aux haricots noirs", "Yaourt nature + fruits rouges", "Saumon, asperges, lentilles vertes"],
  ["Tartine intégrale, ricotta, fraises, graines", "Pomme + noix de cajou", "Poulet tandoori, légumes rôtis, pois cassés", "Houmous + concombre", "Tofu citronné, haricots verts, orge"],
];

const mealNames = ["Petit-déjeuner", "Collation", "Déjeuner", "Goûter", "Dîner"];
const mealShares = [0.25, 0.1, 0.3, 0.1, 0.25];
const round10 = (value: number) => Math.round(value / 10) * 10;
const decimal = (value: number) => value.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

export default function Home() {
  const [profile, setProfile] = useState<Profile>({ sex: "female", goal: "loss", age: 35, weight: 82, target: 70, height: 168, activity: 1.375 });
  const [result, setResult] = useState<Profile>(profile);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [menuIndex, setMenuIndex] = useState(0);
  const [mealIndex, setMealIndex] = useState(2);

  const metrics = useMemo(() => {
    const bmi = result.weight / Math.pow(result.height / 100, 2);
    const targetBmi = result.target / Math.pow(result.height / 100, 2);
    const bmr = 10 * result.weight + 6.25 * result.height - 5 * result.age + (result.sex === "male" ? 5 : -161);
    const tdee = bmr * result.activity;
    const floor = result.sex === "female" ? 1200 : 1500;
    const eligible = result.goal === "loss" && bmi >= 18.5 && targetBmi >= 18.5 && result.target < result.weight && result.age < 70;
    const high = eligible ? Math.max(floor, round10(tdee - 500)) : round10(tdee);
    const low = eligible ? Math.max(floor, round10(tdee - 750)) : round10(tdee);
    const lossCalories = eligible ? round10((low + high) / 2) : round10(tdee);
    const dailyCalories = result.goal === "maintain" ? round10(tdee) : lossCalories;
    const weeks = Math.max(0, (result.weight - result.target) / 0.75);
    return { bmi, targetBmi, bmr: round10(bmr), tdee: round10(tdee), low, high, lossCalories, dailyCalories, weeks, eligible };
  }, [result]);

  const filteredFoods = useMemo(() => foods.filter((food) => {
    const inCategory = category === "Toutes" || food.category === category;
    return inCategory && `${food.name} ${food.note}`.toLowerCase().includes(query.toLowerCase());
  }), [category, query]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setResult({ ...profile });
    document.getElementById("resultats")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const update = (key: keyof Profile, value: string) => setProfile((current) => ({ ...current, [key]: key === "sex" || key === "goal" ? value : Number(value) } as Profile));

  const portionBudget = round10(metrics.dailyCalories * mealShares[mealIndex]);
  const portionMin = round10(portionBudget * 0.9);
  const portionMax = round10(portionBudget * 1.1);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Équilibre Santé, accueil"><span>é</span> Équilibre Santé</a>
        <nav aria-label="Navigation principale"><a href="#calculateur">Mon bilan</a><a href="#aliments">Aliments</a><a href="#menus">Menus</a></nav>
        <a className="nav-cta" href="#calculateur">Commencer</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">MIEUX MANGER • BOUGER • DURER</p><h1>Votre équilibre,<br /><em>à votre rythme.</em></h1><p className="hero-lead">Un repère personnalisé pour comprendre vos besoins, organiser cinq repas et préserver votre force, que votre objectif soit le maintien ou une perte de poids progressive.</p><div className="hero-badges"><span>✓ Calcul instantané</span><span>✓ Portions par repas</span><span>✓ Adultes 18+</span></div></div>
        <aside className="safety-card"><div className="safety-icon">↗</div><p className="mini-label">DEUX CAPS POSSIBLES</p><h2>Maintenir ou progresser sereinement.</h2><p>Choisissez l’équilibre actuel ou, si votre profil le permet, <strong>un rythme indicatif de 0,5 à 1 kg/semaine</strong>. Le budget de chaque repas s’ajuste automatiquement.</p><a href="#portions">Voir mes portions <span>→</span></a></aside>
      </section>

      <section className="calculator-wrap" id="calculateur">
        <div className="section-heading compact"><p className="step">01 — VOS REPÈRES</p><h2>Commençons par vous.</h2><p>Les résultats sont des estimations, pas un diagnostic.</p></div>
        <form className="calculator" onSubmit={submit}>
          <fieldset className="sex-choice"><legend>Sexe utilisé par la formule</legend><label className={profile.sex === "female" ? "active" : ""}><input type="radio" name="sex" value="female" checked={profile.sex === "female"} onChange={(e) => update("sex", e.target.value)} />Femme</label><label className={profile.sex === "male" ? "active" : ""}><input type="radio" name="sex" value="male" checked={profile.sex === "male"} onChange={(e) => update("sex", e.target.value)} />Homme</label></fieldset>
          <fieldset className="goal-choice"><legend>Votre objectif</legend><label className={profile.goal === "maintain" ? "active" : ""}><input type="radio" name="goal" value="maintain" checked={profile.goal === "maintain"} onChange={(e) => update("goal", e.target.value)} /><b>Maintenir</b><small>Équilibre actuel</small></label><label className={profile.goal === "loss" ? "active" : ""}><input type="radio" name="goal" value="loss" checked={profile.goal === "loss"} onChange={(e) => update("goal", e.target.value)} /><b>Perdre progressivement</b><small>0,5 à 1 kg/semaine</small></label></fieldset>
          <label>Âge <span><input aria-label="Âge en années" type="number" min="18" max="85" value={profile.age} onChange={(e) => update("age", e.target.value)} /> ans</span></label>
          <label>Poids actuel <span><input aria-label="Poids actuel en kilogrammes" type="number" min="40" max="300" step="0.1" value={profile.weight} onChange={(e) => update("weight", e.target.value)} /> kg</span></label>
          <label>Poids cible {profile.goal === "loss" && <small>progressif</small>} <span><input aria-label="Poids cible en kilogrammes" type="number" min="40" max="250" step="0.1" value={profile.goal === "maintain" ? profile.weight : profile.target} disabled={profile.goal === "maintain"} onChange={(e) => update("target", e.target.value)} /> kg</span></label>
          <label>Taille <span><input aria-label="Taille en centimètres" type="number" min="130" max="220" value={profile.height} onChange={(e) => update("height", e.target.value)} /> cm</span></label>
          <label>Activité <select value={profile.activity} onChange={(e) => update("activity", e.target.value)}><option value="1.2">Sédentaire · peu de marche</option><option value="1.375">Légère · 1–3 séances/sem.</option><option value="1.55">Modérée · 3–5 séances/sem.</option><option value="1.725">Élevée · 6–7 séances/sem.</option><option value="1.9">Très élevée · travail physique</option></select></label>
          <button type="submit">Calculer mon repère <span>→</span></button>
        </form>
      </section>

      <section className="results" id="resultats" aria-live="polite">
        <div className="results-title"><p className="step light">02 — VOTRE BILAN</p><h2>Une trajectoire réaliste.</h2></div>
        <div className="metric-grid">
          <article><span className="metric-icon coral">IMC</span><p>IMC actuel</p><strong>{decimal(metrics.bmi)}</strong><small>{result.goal === "maintain" ? "Repère pour suivre l’équilibre" : `Cible ${decimal(metrics.targetBmi)} · écart ${decimal(Math.abs(metrics.bmi - metrics.targetBmi))}`}</small></article>
          <article><span className="metric-icon yellow">⚡</span><p>Métabolisme au repos</p><strong>{metrics.bmr}</strong><small>kcal/jour · formule Mifflin-St Jeor</small></article>
          <article><span className="metric-icon mint">↗</span><p>Maintien estimé</p><strong>{metrics.tdee}</strong><small>kcal/jour · activité incluse</small></article>
          <article className="target-card"><span className="metric-icon blue">◎</span><p>{result.goal === "maintain" ? "Ration de maintien" : metrics.eligible ? "Ration progressive" : "Maintien conseillé"}</p><strong>{result.goal === "loss" && metrics.eligible ? `${metrics.low}–${metrics.high}` : metrics.tdee}</strong><small>{result.goal === "maintain" ? "kcal/jour · équilibre estimé" : metrics.eligible ? "kcal/jour · rythme indicatif 0,5–1 kg/sem." : "kcal/jour · avis professionnel avant déficit"}</small></article>
        </div>
        <div className="trajectory"><div><p className="mini-label">{result.goal === "maintain" ? "CAP MAINTIEN" : metrics.eligible ? "RYTHME INDICATIF" : "GARDE-FOU ACTIVÉ"}</p><h3>{result.goal === "maintain" ? "Préserver l’équilibre actuel" : metrics.eligible ? `Environ ${Math.ceil(metrics.weeks)} semaines` : "Pas de déficit automatique"}</h3><p>{result.goal === "maintain" ? "La ration estimée vise à rapprocher les apports de vos dépenses quotidiennes." : metrics.eligible ? "pour atteindre la cible autour de 0,75 kg/semaine. La courbe réelle n’est jamais linéaire." : "Votre profil ou votre cible nécessite un avis médical ou diététique personnalisé avant une perte de poids."}</p></div>{result.goal === "maintain" ? <div className="balance-note"><strong>{metrics.tdee} kcal / jour</strong><span>Apports estimés ≈ dépenses estimées</span></div> : <div className="range"><span>Départ <b>{result.weight} kg</b></span><div><i style={{ width: `${Math.min(100, Math.max(4, ((result.weight - result.target) / result.weight) * 100 * 3))}%` }} /></div><span>Cible <b>{result.target} kg</b></span></div>}</div>
      </section>

      <section className="safety" id="portions">
        <div className="section-heading"><p className="step">03 — CALCULATEUR DE PORTION</p><h2>Un budget raisonnable pour chaque repas.</h2><p>Le calcul répartit votre ration journalière en cinq prises. Il indique une enveloppe calorique, à adapter à votre faim et à la composition réelle de l’assiette.</p></div>
        <div className="portion-tool">
          <div className="portion-controls">
            <label>Objectif retenu<select aria-label="Objectif calorique" value={result.goal} onChange={(e) => { const goal = e.target.value as Profile["goal"]; setProfile((current) => ({ ...current, goal })); setResult((current) => ({ ...current, goal })); }}><option value="maintain">Maintenir l’équilibre</option><option value="loss">Perte progressive</option></select></label>
            <label>Moment du repas<select aria-label="Moment du repas" value={mealIndex} onChange={(e) => setMealIndex(Number(e.target.value))}>{mealNames.map((name, index) => <option value={index} key={name}>{name} · {Math.round(mealShares[index] * 100)} %</option>)}</select></label>
          </div>
          <div className="portion-result" aria-live="polite"><span>{mealNames[mealIndex]}</span><strong>{portionBudget} <small>kcal</small></strong><p>Fourchette pratique : {portionMin}–{portionMax} kcal</p><i>{Math.round(mealShares[mealIndex] * 100)} % de {metrics.dailyCalories} kcal/jour</i></div>
          <div className="plate-guide"><p className="mini-label">COMPOSER LA PORTION</p>{mealIndex === 1 || mealIndex === 3 ? <div className="plate-items snack"><span><b>50 %</b> fruit entier</span><span><b>35 %</b> laitage ou protéine</span><span><b>15 %</b> oléagineux</span></div> : mealIndex === 0 ? <div className="plate-items breakfast"><span><b>30 %</b> protéine ou laitage</span><span><b>30 %</b> céréale complète</span><span><b>25 %</b> fruit entier</span><span><b>15 %</b> graines ou noix</span></div> : <div className="plate-items main"><span><b>50 %</b> légumes</span><span><b>25 %</b> protéines</span><span><b>20 %</b> féculent IG bas</span><span><b>5 %</b> matière grasse</span></div>}</div>
        </div>
        <p className="medical-note"><strong>Parlez-en à un professionnel</strong> si vous êtes enceinte/allaitante, avez moins de 18 ans, plus de 70 ans, un IMC &lt; 18,5 ou ≥ 35, un diabète, une maladie rénale/cardiaque, un trouble alimentaire, ou si la ration calculée vous semble trop basse.</p>
      </section>

      <section className="strength">
        <div className="strength-copy"><p className="step light">04 — PRÉSERVER LE MUSCLE</p><h2>Votre force est une priorité.</h2><p>Visez au moins deux séances de renforcement par semaine, en sollicitant tous les grands groupes musculaires. Commencez léger et progressez sans douleur.</p><div className="workout-meta"><div><strong>2–3×</strong><span>par semaine</span></div><div><strong>30–45</strong><span>minutes</span></div><div><strong>2–3</strong><span>séries</span></div></div></div>
        <div className="workout-card"><p className="mini-label">SÉANCE CORPS ENTIER · DÉBUTANT</p>{[["01","Squat à la chaise","8–12 répétitions"],["02","Pompes au mur","8–12 répétitions"],["03","Tirage avec élastique","8–12 répétitions"],["04","Pont fessier","10–15 répétitions"],["05","Développé épaules léger","8–12 répétitions"],["06","Gainage adapté","20–30 secondes"]].map((item) => <div className="exercise" key={item[0]}><i>{item[0]}</i><b>{item[1]}</b><span>{item[2]}</span></div>)}<p className="workout-tip">Gardez 1–3 répétitions « en réserve ». Si la technique se dégrade ou si une douleur apparaît, arrêtez.</p></div>
      </section>

      <section className="foods" id="aliments">
        <div className="section-heading"><p className="step">05 — RÉPERTOIRE IG BAS</p><h2>IG ≤ 35, classés par calories.</h2><p>L’IG ne résume pas la qualité d’un aliment. Il varie selon la variété, la maturité, la cuisson et l’association du repas.</p></div>
        <div className="food-toolbar"><label>Rechercher<input type="search" placeholder="Ex. lentilles, pomme…" value={query} onChange={(e) => setQuery(e.target.value)} /></label><div className="chips" aria-label="Filtrer par catégorie">{["Toutes", "Légumes", "Fruits", "Légumineuses", "Laitages", "Céréales", "Oléagineux", "Plaisir"].map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <div className="table-wrap"><table><thead><tr><th>Aliment</th><th>Catégorie</th><th>kcal / 100 g*</th><th>IG indicatif</th><th>Repère</th></tr></thead><tbody>{filteredFoods.map((food) => <tr key={food.name}><td><strong>{food.name}</strong></td><td><span className="category-pill">{food.category}</span></td><td>{food.kcal}</td><td><b className="gi">{food.gi}</b></td><td>{food.note}</td></tr>)}</tbody></table></div>
        <p className="table-note">*Valeurs moyennes et sélection large, non exhaustive : aucune base fiable ne peut l’être pour « tous les aliments ». Les kcal varient selon marque et préparation. Les aliments sans glucides mesurables (viandes, poissons, œufs, huiles) n’ont pas d’IG pertinent et ne sont pas inclus.</p>
      </section>

      <section className="menus" id="menus">
        <div className="section-heading"><p className="step light">06 — 10 JOURNÉES-TYPES</p><h2>Cinq moments, une ration lisible.</h2><p>Chaque carte répartit votre repère de {metrics.dailyCalories} kcal : 25 % / 10 % / 30 % / 10 % / 25 %. Ajustez les portions, pas la diversité.</p></div>
        <div className="menu-tabs" aria-label="Choisir un menu">{menus.map((_, index) => <button type="button" key={index} className={menuIndex === index ? "active" : ""} onClick={() => setMenuIndex(index)}>{String(index + 1).padStart(2, "0")}</button>)}</div>
        <article className="daily-menu"><div className="menu-header"><div><span>MENU {String(menuIndex + 1).padStart(2, "0")}</span><h3>Une journée à personnaliser</h3></div><div className="kcal-badge"><strong>{metrics.dailyCalories}</strong><span>kcal / jour</span></div></div><div className="meal-list">{menus[menuIndex].map((meal, index) => <div className="meal" key={mealNames[index]}><div className="meal-time"><i>{["07:30","10:30","13:00","16:30","19:30"][index]}</i><b>{mealNames[index]}</b></div><p>{meal}</p><strong>Budget ≈ {round10(metrics.dailyCalories * mealShares[index])} kcal</strong></div>)}</div></article>
      </section>

      <section className="habits">
        <div className="section-heading"><p className="step">07 — LES BONS RÉFLEXES</p><h2>Plus de goût, moins d’excès.</h2></div>
        <div className="habit-grid"><article className="limit"><span className="habit-symbol">–</span><h3>À limiter fortement</h3><ul><li>Sucre ajouté et boissons sucrées</li><li>Fritures et panures</li><li>Produits ultra-transformés</li><li>Graisses saturées en excès</li><li>Grignotage non planifié</li><li>Alcool</li><li>Sel ajouté en excès — pas « zéro sel »</li></ul></article><article className="favor"><span className="habit-symbol">+</span><h3>À inviter souvent</h3><ul><li>Herbes fraîches et aromates</li><li>Épices, ail, oignon, gingembre</li><li>Citron, vinaigres, zestes</li><li>Légumes variés et légumineuses</li><li>Protéines à chaque repas principal</li><li>Huiles végétales en petite quantité</li><li>Eau, repas assis et sans écran</li></ul></article></div>
      </section>

      <section className="sources"><p className="mini-label">MÉTHODE & SOURCES</p><p>Calcul énergétique : équation de Mifflin–St Jeor, puis coefficient d’activité. Repères de perte de poids : CDC, HAS/Assurance Maladie. Activité musculaire : recommandations HHS/ACSM. IG : base internationale de l’Université de Sydney. Énergie des aliments : valeurs moyennes CIQUAL.</p><div><a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noreferrer">Mifflin–St Jeor ↗</a><a href="https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html" target="_blank" rel="noreferrer">CDC ↗</a><a href="https://www.ameli.fr/assure/sante/themes/surpoids-obesite-adulte/preparer-agir" target="_blank" rel="noreferrer">Ameli ↗</a><a href="https://www.acsm.org/wp-content/uploads/2026/03/Resistance-Training-Position-Stand-infographic.pdf" target="_blank" rel="noreferrer">ACSM ↗</a><a href="https://glycemicindex.com/about-gi/" target="_blank" rel="noreferrer">GI Database ↗</a><a href="https://ciqual.anses.fr/" target="_blank" rel="noreferrer">CIQUAL ↗</a></div></section>

      <footer><div className="brand"><span>é</span> Équilibre Santé</div><p>Un outil éducatif, jamais une ordonnance.</p><a href="#top">Retour en haut ↑</a></footer>
    </main>
  );
}
