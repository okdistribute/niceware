(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (Buffer){(function (){
'use strict'
// @flow
/**
 * A module for converting cryptographic keys into human-readable phrases.
 * @module niceware
 */

const bs = require('binary-search')
const wordlist = require('./wordlist.json')
const randomBytes = require('randombytes')

const MAX_PASSPHRASE_SIZE = 1024 // Max size of passphrase in bytes

/**
 * @alias module:niceware
 */
const niceware = {}

/**
 * Converts a byte array into a passphrase.
 * @param {Buffer} bytes The bytes to convert
 * @returns {Array.<string>}
 */
niceware.bytesToPassphrase = function (bytes) {
  // XXX: Uint8Array should only be used when this is called in the browser
  // context.
  if (!Buffer.isBuffer(bytes) &&
    !(typeof window === 'object' && bytes instanceof window.Uint8Array)) {
    throw new Error('Input must be a Buffer or Uint8Array.')
  }
  if (bytes.length % 2 === 1) {
    throw new Error('Only even-sized byte arrays are supported.')
  }
  const words = []
  for (const entry of bytes.entries()) {
    const index = entry[0]
    const byte = entry[1]
    const next = bytes[index + 1]
    if (index % 2 === 0) {
      const wordIndex = byte * 256 + next
      const word = wordlist[wordIndex]
      if (!word) {
        throw new Error('Invalid byte encountered')
      } else {
        words.push(word)
      }
    }
  }
  return words
}

/**
 * Converts a phrase back into the original byte array.
 * @param {Array.<string>} words The words to convert
 * @returns {Buffer}
 */
niceware.passphraseToBytes = function (words/* : Array<string> */) {
  if (!Array.isArray(words)) {
    throw new Error('Input must be an array.')
  }

  const bytes = Buffer.alloc(words.length * 2)

  words.forEach((word, index) => {
    if (typeof word !== 'string') {
      throw new Error('Word must be a string.')
    }
    const wordIndex = bs(wordlist, word.toLowerCase(), (a, b) => {
      if (a === b) {
        return 0
      }
      return a > b ? 1 : -1
    })
    if (wordIndex < 0) {
      throw new Error(`Invalid word: ${word}`)
    }
    bytes[2 * index] = Math.floor(wordIndex / 256)
    bytes[2 * index + 1] = wordIndex % 256
  })

  return bytes
}

/**
 * Generates a random passphrase with the specified number of bytes.
 * NOTE: `size` must be an even number.
 * @param {number} size The number of random bytes to use
 * @returns {Array.<string>}
 */
niceware.generatePassphrase = function (size/* : number */) {
  if (typeof size !== 'number' || size < 0 || size > MAX_PASSPHRASE_SIZE) {
    throw new Error(`Size must be between 0 and ${MAX_PASSPHRASE_SIZE} bytes.`)
  }
  const bytes = randomBytes(size)
  return niceware.bytesToPassphrase(bytes)
}

// For browserify
if (typeof window === 'object') {
  window.niceware = niceware
}

module.exports = niceware

}).call(this)}).call(this,require("buffer").Buffer)
},{"./wordlist.json":2,"binary-search":4,"buffer":5,"randombytes":8}],2:[function(require,module,exports){
module.exports=["abacus","abdomen","abdominal","abide","abiding","ability","ablaze","able","abnormal","abrasion","abrasive","abreast","abridge","abroad","abruptly","absence","absentee","absently","absinthe","absolute","absolve","abstain","abstract","absurd","accent","acclaim","acclimate","accompany","account","accuracy","accurate","accustom","acetone","achiness","aching","acid","acorn","acquaint","acquire","acre","acrobat","acronym","acting","action","activate","activator","active","activism","activist","activity","actress","acts","acutely","acuteness","aeration","aerobics","aerosol","aerospace","afar","affair","affected","affecting","affection","affidavit","affiliate","affirm","affix","afflicted","affluent","afford","affront","aflame","afloat","aflutter","afoot","afraid","afterglow","afterlife","aftermath","aftermost","afternoon","aged","ageless","agency","agenda","agent","aggregate","aghast","agile","agility","aging","agnostic","agonize","agonizing","agony","agreeable","agreeably","agreed","agreeing","agreement","aground","ahead","ahoy","aide","aids","aim","ajar","alabaster","alarm","albatross","album","alfalfa","algebra","algorithm","alias","alibi","alienable","alienate","aliens","alike","alive","alkaline","alkalize","almanac","almighty","almost","aloe","aloft","aloha","alone","alongside","aloof","alphabet","alright","although","altitude","alto","aluminum","alumni","always","amaretto","amaze","amazingly","amber","ambiance","ambiguity","ambiguous","ambition","ambitious","ambulance","ambush","amendable","amendment","amends","amenity","amiable","amicably","amid","amigo","amino","amiss","ammonia","ammonium","amnesty","amniotic","among","amount","amperage","ample","amplifier","amplify","amply","amuck","amulet","amusable","amused","amusement","amuser","amusing","anaconda","anaerobic","anagram","anatomist","anatomy","anchor","anchovy","ancient","android","anemia","anemic","aneurism","anew","angelfish","angelic","anger","angled","angler","angles","angling","angrily","angriness","anguished","angular","animal","animate","animating","animation","animator","anime","animosity","ankle","annex","annotate","announcer","annoying","annually","annuity","anointer","another","answering","antacid","antarctic","anteater","antelope","antennae","anthem","anthill","anthology","antibody","antics","antidote","antihero","antiquely","antiques","antiquity","antirust","antitoxic","antitrust","antiviral","antivirus","antler","antonym","antsy","anvil","anybody","anyhow","anymore","anyone","anyplace","anything","anytime","anyway","anywhere","aorta","apache","apostle","appealing","appear","appease","appeasing","appendage","appendix","appetite","appetizer","applaud","applause","apple","appliance","applicant","applied","apply","appointee","appraisal","appraiser","apprehend","approach","approval","approve","apricot","april","apron","aptitude","aptly","aqua","aqueduct","arbitrary","arbitrate","ardently","area","arena","arguable","arguably","argue","arise","armadillo","armband","armchair","armed","armful","armhole","arming","armless","armoire","armored","armory","armrest","army","aroma","arose","around","arousal","arrange","array","arrest","arrival","arrive","arrogance","arrogant","arson","art","ascend","ascension","ascent","ascertain","ashamed","ashen","ashes","ashy","aside","askew","asleep","asparagus","aspect","aspirate","aspire","aspirin","astonish","astound","astride","astrology","astronaut","astronomy","astute","atlantic","atlas","atom","atonable","atop","atrium","atrocious","atrophy","attach","attain","attempt","attendant","attendee","attention","attentive","attest","attic","attire","attitude","attractor","attribute","atypical","auction","audacious","audacity","audible","audibly","audience","audio","audition","augmented","august","authentic","author","autism","autistic","autograph","automaker","automated","automatic","autopilot","available","avalanche","avatar","avenge","avenging","avenue","average","aversion","avert","aviation","aviator","avid","avoid","await","awaken","award","aware","awhile","awkward","awning","awoke","awry","axis","babble","babbling","babied","baboon","backache","backboard","backboned","backdrop","backed","backer","backfield","backfire","backhand","backing","backlands","backlash","backless","backlight","backlit","backlog","backpack","backpedal","backrest","backroom","backshift","backside","backslid","backspace","backspin","backstab","backstage","backtalk","backtrack","backup","backward","backwash","backwater","backyard","bacon","bacteria","bacterium","badass","badge","badland","badly","badness","baffle","baffling","bagel","bagful","baggage","bagged","baggie","bagginess","bagging","baggy","bagpipe","baguette","baked","bakery","bakeshop","baking","balance","balancing","balcony","balmy","balsamic","bamboo","banana","banish","banister","banjo","bankable","bankbook","banked","banker","banking","banknote","bankroll","banner","bannister","banshee","banter","barbecue","barbed","barbell","barber","barcode","barge","bargraph","barista","baritone","barley","barmaid","barman","barn","barometer","barrack","barracuda","barrel","barrette","barricade","barrier","barstool","bartender","barterer","bash","basically","basics","basil","basin","basis","basket","batboy","batch","bath","baton","bats","battalion","battered","battering","battery","batting","battle","bauble","bazooka","blabber","bladder","blade","blah","blame","blaming","blanching","blandness","blank","blaspheme","blasphemy","blast","blatancy","blatantly","blazer","blazing","bleach","bleak","bleep","blemish","blend","bless","blighted","blimp","bling","blinked","blinker","blinking","blinks","blip","blissful","blitz","blizzard","bloated","bloating","blob","blog","bloomers","blooming","blooper","blot","blouse","blubber","bluff","bluish","blunderer","blunt","blurb","blurred","blurry","blurt","blush","blustery","boaster","boastful","boasting","boat","bobbed","bobbing","bobble","bobcat","bobsled","bobtail","bodacious","body","bogged","boggle","bogus","boil","bok","bolster","bolt","bonanza","bonded","bonding","bondless","boned","bonehead","boneless","bonelike","boney","bonfire","bonnet","bonsai","bonus","bony","boogeyman","boogieman","book","boondocks","booted","booth","bootie","booting","bootlace","bootleg","boots","boozy","borax","boring","borough","borrower","borrowing","boss","botanical","botanist","botany","botch","both","bottle","bottling","bottom","bounce","bouncing","bouncy","bounding","boundless","bountiful","bovine","boxcar","boxer","boxing","boxlike","boxy","breach","breath","breeches","breeching","breeder","breeding","breeze","breezy","brethren","brewery","brewing","briar","bribe","brick","bride","bridged","brigade","bright","brilliant","brim","bring","brink","brisket","briskly","briskness","bristle","brittle","broadband","broadcast","broaden","broadly","broadness","broadside","broadways","broiler","broiling","broken","broker","bronchial","bronco","bronze","bronzing","brook","broom","brought","browbeat","brownnose","browse","browsing","bruising","brunch","brunette","brunt","brush","brussels","brute","brutishly","bubble","bubbling","bubbly","buccaneer","bucked","bucket","buckle","buckshot","buckskin","bucktooth","buckwheat","buddhism","buddhist","budding","buddy","budget","buffalo","buffed","buffer","buffing","buffoon","buggy","bulb","bulge","bulginess","bulgur","bulk","bulldog","bulldozer","bullfight","bullfrog","bullhorn","bullion","bullish","bullpen","bullring","bullseye","bullwhip","bully","bunch","bundle","bungee","bunion","bunkbed","bunkhouse","bunkmate","bunny","bunt","busboy","bush","busily","busload","bust","busybody","buzz","cabana","cabbage","cabbie","cabdriver","cable","caboose","cache","cackle","cacti","cactus","caddie","caddy","cadet","cadillac","cadmium","cage","cahoots","cake","calamari","calamity","calcium","calculate","calculus","caliber","calibrate","calm","caloric","calorie","calzone","camcorder","cameo","camera","camisole","camper","campfire","camping","campsite","campus","canal","canary","cancel","candied","candle","candy","cane","canine","canister","cannabis","canned","canning","cannon","cannot","canola","canon","canopener","canopy","canteen","canyon","capable","capably","capacity","cape","capillary","capital","capitol","capped","capricorn","capsize","capsule","caption","captivate","captive","captivity","capture","caramel","carat","caravan","carbon","cardboard","carded","cardiac","cardigan","cardinal","cardstock","carefully","caregiver","careless","caress","caretaker","cargo","caring","carless","carload","carmaker","carnage","carnation","carnival","carnivore","carol","carpenter","carpentry","carpool","carport","carried","carrot","carrousel","carry","cartel","cartload","carton","cartoon","cartridge","cartwheel","carve","carving","carwash","cascade","case","cash","casing","casino","casket","cassette","casually","casualty","catacomb","catalog","catalyst","catalyze","catapult","cataract","catatonic","catcall","catchable","catcher","catching","catchy","caterer","catering","catfight","catfish","cathedral","cathouse","catlike","catnap","catnip","catsup","cattail","cattishly","cattle","catty","catwalk","caucasian","caucus","causal","causation","cause","causing","cauterize","caution","cautious","cavalier","cavalry","caviar","cavity","cedar","celery","celestial","celibacy","celibate","celtic","cement","census","ceramics","ceremony","certainly","certainty","certified","certify","cesarean","cesspool","chafe","chaffing","chain","chair","chalice","challenge","chamber","chamomile","champion","chance","change","channel","chant","chaos","chaperone","chaplain","chapped","chaps","chapter","character","charbroil","charcoal","charger","charging","chariot","charity","charm","charred","charter","charting","chase","chasing","chaste","chastise","chastity","chatroom","chatter","chatting","chatty","cheating","cheddar","cheek","cheer","cheese","cheesy","chef","chemicals","chemist","chemo","cherisher","cherub","chess","chest","chevron","chevy","chewable","chewer","chewing","chewy","chief","chihuahua","childcare","childhood","childish","childless","childlike","chili","chill","chimp","chip","chirping","chirpy","chitchat","chivalry","chive","chloride","chlorine","choice","chokehold","choking","chomp","chooser","choosing","choosy","chop","chosen","chowder","chowtime","chrome","chubby","chuck","chug","chummy","chump","chunk","churn","chute","cider","cilantro","cinch","cinema","cinnamon","circle","circling","circular","circulate","circus","citable","citadel","citation","citizen","citric","citrus","city","civic","civil","clad","claim","clambake","clammy","clamor","clamp","clamshell","clang","clanking","clapped","clapper","clapping","clarify","clarinet","clarity","clash","clasp","class","clatter","clause","clavicle","claw","clay","clean","clear","cleat","cleaver","cleft","clench","clergyman","clerical","clerk","clever","clicker","client","climate","climatic","cling","clinic","clinking","clip","clique","cloak","clobber","clock","clone","cloning","closable","closure","clothes","clothing","cloud","clover","clubbed","clubbing","clubhouse","clump","clumsily","clumsy","clunky","clustered","clutch","clutter","coach","coagulant","coastal","coaster","coasting","coastland","coastline","coat","coauthor","cobalt","cobbler","cobweb","cocoa","coconut","cod","coeditor","coerce","coexist","coffee","cofounder","cognition","cognitive","cogwheel","coherence","coherent","cohesive","coil","coke","cola","cold","coleslaw","coliseum","collage","collapse","collar","collected","collector","collide","collie","collision","colonial","colonist","colonize","colony","colossal","colt","coma","come","comfort","comfy","comic","coming","comma","commence","commend","comment","commerce","commode","commodity","commodore","common","commotion","commute","commuting","compacted","compacter","compactly","compactor","companion","company","compare","compel","compile","comply","component","composed","composer","composite","compost","composure","compound","compress","comprised","computer","computing","comrade","concave","conceal","conceded","concept","concerned","concert","conch","concierge","concise","conclude","concrete","concur","condense","condiment","condition","condone","conducive","conductor","conduit","cone","confess","confetti","confidant","confident","confider","confiding","configure","confined","confining","confirm","conflict","conform","confound","confront","confused","confusing","confusion","congenial","congested","congrats","congress","conical","conjoined","conjure","conjuror","connected","connector","consensus","consent","console","consoling","consonant","constable","constant","constrain","constrict","construct","consult","consumer","consuming","contact","container","contempt","contend","contented","contently","contents","contest","context","contort","contour","contrite","control","contusion","convene","convent","copartner","cope","copied","copier","copilot","coping","copious","copper","copy","coral","cork","cornball","cornbread","corncob","cornea","corned","corner","cornfield","cornflake","cornhusk","cornmeal","cornstalk","corny","coronary","coroner","corporal","corporate","corral","correct","corridor","corrode","corroding","corrosive","corsage","corset","cortex","cosigner","cosmetics","cosmic","cosmos","cosponsor","cost","cottage","cotton","couch","cough","could","countable","countdown","counting","countless","country","county","courier","covenant","cover","coveted","coveting","coyness","cozily","coziness","cozy","crabbing","crabgrass","crablike","crabmeat","cradle","cradling","crafter","craftily","craftsman","craftwork","crafty","cramp","cranberry","crane","cranial","cranium","crank","crate","crave","craving","crawfish","crawlers","crawling","crayfish","crayon","crazed","crazily","craziness","crazy","creamed","creamer","creamlike","crease","creasing","creatable","create","creation","creative","creature","credible","credibly","credit","creed","creme","creole","crepe","crept","crescent","crested","cresting","crestless","crevice","crewless","crewman","crewmate","crib","cricket","cried","crier","crimp","crimson","cringe","cringing","crinkle","crinkly","crisped","crisping","crisply","crispness","crispy","criteria","critter","croak","crock","crook","croon","crop","cross","crouch","crouton","crowbar","crowd","crown","crucial","crudely","crudeness","cruelly","cruelness","cruelty","crumb","crummiest","crummy","crumpet","crumpled","cruncher","crunching","crunchy","crusader","crushable","crushed","crusher","crushing","crust","crux","crying","cryptic","crystal","cubbyhole","cube","cubical","cubicle","cucumber","cuddle","cuddly","cufflink","culinary","culminate","culpable","culprit","cultivate","cultural","culture","cupbearer","cupcake","cupid","cupped","cupping","curable","curator","curdle","cure","curfew","curing","curled","curler","curliness","curling","curly","curry","curse","cursive","cursor","curtain","curtly","curtsy","curvature","curve","curvy","cushy","cusp","cussed","custard","custodian","custody","customary","customer","customize","customs","cut","cycle","cyclic","cycling","cyclist","cylinder","cymbal","cytoplasm","cytoplast","dab","dad","daffodil","dagger","daily","daintily","dainty","dairy","daisy","dallying","dance","dancing","dandelion","dander","dandruff","dandy","danger","dangle","dangling","daredevil","dares","daringly","darkened","darkening","darkish","darkness","darkroom","darling","darn","dart","darwinism","dash","dastardly","data","datebook","dating","daughter","daunting","dawdler","dawn","daybed","daybreak","daycare","daydream","daylight","daylong","dayroom","daytime","dazzler","dazzling","deacon","deafening","deafness","dealer","dealing","dealmaker","dealt","dean","debatable","debate","debating","debit","debrief","debtless","debtor","debug","debunk","decade","decaf","decal","decathlon","decay","deceased","deceit","deceiver","deceiving","december","decency","decent","deception","deceptive","decibel","decidable","decimal","decimeter","decipher","deck","declared","decline","decode","decompose","decorated","decorator","decoy","decrease","decree","dedicate","dedicator","deduce","deduct","deed","deem","deepen","deeply","deepness","deface","defacing","defame","default","defeat","defection","defective","defendant","defender","defense","defensive","deferral","deferred","defiance","defiant","defile","defiling","define","definite","deflate","deflation","deflator","deflected","deflector","defog","deforest","defraud","defrost","deftly","defuse","defy","degraded","degrading","degrease","degree","dehydrate","deity","dejected","delay","delegate","delegator","delete","deletion","delicacy","delicate","delicious","delighted","delirious","delirium","deliverer","delivery","delouse","delta","deluge","delusion","deluxe","demanding","demeaning","demeanor","demise","democracy","democrat","demote","demotion","demystify","denatured","deniable","denial","denim","denote","dense","density","dental","dentist","denture","deny","deodorant","deodorize","departed","departure","depict","deplete","depletion","deplored","deploy","deport","depose","depraved","depravity","deprecate","depress","deprive","depth","deputize","deputy","derail","deranged","derby","derived","desecrate","deserve","deserving","designate","designed","designer","designing","deskbound","desktop","deskwork","desolate","despair","despise","despite","destiny","destitute","destruct","detached","detail","detection","detective","detector","detention","detergent","detest","detonate","detonator","detoxify","detract","deuce","devalue","deviancy","deviant","deviate","deviation","deviator","device","devious","devotedly","devotee","devotion","devourer","devouring","devoutly","dexterity","dexterous","diabetes","diabetic","diabolic","diagnoses","diagnosis","diagram","dial","diameter","diaper","diaphragm","diary","dice","dicing","dictate","dictation","dictator","difficult","diffused","diffuser","diffusion","diffusive","dig","dilation","diligence","diligent","dill","dilute","dime","diminish","dimly","dimmed","dimmer","dimness","dimple","diner","dingbat","dinghy","dinginess","dingo","dingy","dining","dinner","diocese","dioxide","diploma","dipped","dipper","dipping","directed","direction","directive","directly","directory","direness","dirtiness","disabled","disagree","disallow","disarm","disarray","disaster","disband","disbelief","disburse","discard","discern","discharge","disclose","discolor","discount","discourse","discover","discuss","disdain","disengage","disfigure","disgrace","dish","disinfect","disjoin","disk","dislike","disliking","dislocate","dislodge","disloyal","dismantle","dismay","dismiss","dismount","disobey","disorder","disown","disparate","disparity","dispatch","dispense","dispersal","dispersed","disperser","displace","display","displease","disposal","dispose","disprove","dispute","disregard","disrupt","dissuade","distance","distant","distaste","distill","distinct","distort","distract","distress","district","distrust","ditch","ditto","ditzy","dividable","divided","dividend","dividers","dividing","divinely","diving","divinity","divisible","divisibly","division","divisive","divorcee","dizziness","dizzy","doable","docile","dock","doctrine","document","dodge","dodgy","doily","doing","dole","dollar","dollhouse","dollop","dolly","dolphin","domain","domelike","domestic","dominion","dominoes","donated","donation","donator","donor","donut","doodle","doorbell","doorframe","doorknob","doorman","doormat","doornail","doorpost","doorstep","doorstop","doorway","doozy","dork","dormitory","dorsal","dosage","dose","dotted","doubling","douche","dove","down","dowry","doze","drab","dragging","dragonfly","dragonish","dragster","drainable","drainage","drained","drainer","drainpipe","dramatic","dramatize","drank","drapery","drastic","draw","dreaded","dreadful","dreadlock","dreamboat","dreamily","dreamland","dreamless","dreamlike","dreamt","dreamy","drearily","dreary","drench","dress","drew","dribble","dried","drier","drift","driller","drilling","drinkable","drinking","dripping","drippy","drivable","driven","driver","driveway","driving","drizzle","drizzly","drone","drool","droop","drop-down","dropbox","dropkick","droplet","dropout","dropper","drove","drown","drowsily","drudge","drum","dry","dubbed","dubiously","duchess","duckbill","ducking","duckling","ducktail","ducky","duct","dude","duffel","dugout","duh","duke","duller","dullness","duly","dumping","dumpling","dumpster","duo","dupe","duplex","duplicate","duplicity","durable","durably","duration","duress","during","dusk","dust","dutiful","duty","duvet","dwarf","dweeb","dwelled","dweller","dwelling","dwindle","dwindling","dynamic","dynamite","dynasty","dyslexia","dyslexic","each","eagle","earache","eardrum","earflap","earful","earlobe","early","earmark","earmuff","earphone","earpiece","earplugs","earring","earshot","earthen","earthlike","earthling","earthly","earthworm","earthy","earwig","easeful","easel","easiest","easily","easiness","easing","eastbound","eastcoast","easter","eastward","eatable","eaten","eatery","eating","eats","ebay","ebony","ebook","ecard","eccentric","echo","eclair","eclipse","ecologist","ecology","economic","economist","economy","ecosphere","ecosystem","edge","edginess","edging","edgy","edition","editor","educated","education","educator","eel","effective","effects","efficient","effort","eggbeater","egging","eggnog","eggplant","eggshell","egomaniac","egotism","egotistic","either","eject","elaborate","elastic","elated","elbow","eldercare","elderly","eldest","electable","election","elective","elephant","elevate","elevating","elevation","elevator","eleven","elf","eligible","eligibly","eliminate","elite","elitism","elixir","elk","ellipse","elliptic","elm","elongated","elope","eloquence","eloquent","elsewhere","elude","elusive","elves","email","embargo","embark","embassy","embattled","embellish","ember","embezzle","emblaze","emblem","embody","embolism","emboss","embroider","emcee","emerald","emergency","emission","emit","emote","emoticon","emotion","empathic","empathy","emperor","emphases","emphasis","emphasize","emphatic","empirical","employed","employee","employer","emporium","empower","emptier","emptiness","empty","emu","enable","enactment","enamel","enchanted","enchilada","encircle","enclose","enclosure","encode","encore","encounter","encourage","encroach","encrust","encrypt","endanger","endeared","endearing","ended","ending","endless","endnote","endocrine","endorphin","endorse","endowment","endpoint","endurable","endurance","enduring","energetic","energize","energy","enforced","enforcer","engaged","engaging","engine","engorge","engraved","engraver","engraving","engross","engulf","enhance","enigmatic","enjoyable","enjoyably","enjoyer","enjoying","enjoyment","enlarged","enlarging","enlighten","enlisted","enquirer","enrage","enrich","enroll","enslave","ensnare","ensure","entail","entangled","entering","entertain","enticing","entire","entitle","entity","entomb","entourage","entrap","entree","entrench","entrust","entryway","entwine","enunciate","envelope","enviable","enviably","envious","envision","envoy","envy","enzyme","epic","epidemic","epidermal","epidermis","epidural","epilepsy","epileptic","epilogue","epiphany","episode","equal","equate","equation","equator","equinox","equipment","equity","equivocal","eradicate","erasable","erased","eraser","erasure","ergonomic","errand","errant","erratic","error","erupt","escalate","escalator","escapable","escapade","escapist","escargot","eskimo","esophagus","espionage","espresso","esquire","essay","essence","essential","establish","estate","esteemed","estimate","estimator","estranged","estrogen","etching","eternal","eternity","ethanol","ether","ethically","ethics","euphemism","evacuate","evacuee","evade","evaluate","evaluator","evaporate","evasion","evasive","even","everglade","evergreen","everybody","everyday","everyone","evict","evidence","evident","evil","evoke","evolution","evolve","exact","exalted","example","excavate","excavator","exceeding","exception","excess","exchange","excitable","exciting","exclaim","exclude","excluding","exclusion","exclusive","excretion","excretory","excursion","excusable","excusably","excuse","exemplary","exemplify","exemption","exerciser","exert","exes","exfoliate","exhale","exhaust","exhume","exile","existing","exit","exodus","exonerate","exorcism","exorcist","expand","expanse","expansion","expansive","expectant","expedited","expediter","expel","expend","expenses","expensive","expert","expire","expiring","explain","expletive","explicit","explode","exploit","explore","exploring","exponent","exporter","exposable","expose","exposure","express","expulsion","exquisite","extended","extending","extent","extenuate","exterior","external","extinct","extortion","extradite","extras","extrovert","extrude","extruding","exuberant","fable","fabric","fabulous","facebook","facecloth","facedown","faceless","facelift","faceplate","faceted","facial","facility","facing","facsimile","faction","factoid","factor","factsheet","factual","faculty","fade","fading","failing","falcon","fall","false","falsify","fame","familiar","family","famine","famished","fanatic","fancied","fanciness","fancy","fanfare","fang","fanning","fantasize","fantastic","fantasy","fascism","fastball","faster","fasting","fastness","faucet","favorable","favorably","favored","favoring","favorite","fax","feast","federal","fedora","feeble","feed","feel","feisty","feline","felt-tip","feminine","feminism","feminist","feminize","femur","fence","fencing","fender","ferment","fernlike","ferocious","ferocity","ferret","ferris","ferry","fervor","fester","festival","festive","festivity","fetal","fetch","fever","fiber","fiction","fiddle","fiddling","fidelity","fidgeting","fidgety","fifteen","fifth","fiftieth","fifty","figment","figure","figurine","filing","filled","filler","filling","film","filter","filth","filtrate","finale","finalist","finalize","finally","finance","financial","finch","fineness","finer","finicky","finished","finisher","finishing","finite","finless","finlike","fiscally","fit","five","flaccid","flagman","flagpole","flagship","flagstick","flagstone","flail","flakily","flaky","flame","flammable","flanked","flanking","flannels","flap","flaring","flashback","flashbulb","flashcard","flashily","flashing","flashy","flask","flatbed","flatfoot","flatly","flatness","flatten","flattered","flatterer","flattery","flattop","flatware","flatworm","flavored","flavorful","flavoring","flaxseed","fled","fleshed","fleshy","flick","flier","flight","flinch","fling","flint","flip","flirt","float","flock","flogging","flop","floral","florist","floss","flounder","flyable","flyaway","flyer","flying","flyover","flypaper","foam","foe","fog","foil","folic","folk","follicle","follow","fondling","fondly","fondness","fondue","font","food","fool","footage","football","footbath","footboard","footer","footgear","foothill","foothold","footing","footless","footman","footnote","footpad","footpath","footprint","footrest","footsie","footsore","footwear","footwork","fossil","foster","founder","founding","fountain","fox","foyer","fraction","fracture","fragile","fragility","fragment","fragrance","fragrant","frail","frame","framing","frantic","fraternal","frayed","fraying","frays","freckled","freckles","freebase","freebee","freebie","freedom","freefall","freehand","freeing","freeload","freely","freemason","freeness","freestyle","freeware","freeway","freewill","freezable","freezing","freight","french","frenzied","frenzy","frequency","frequent","fresh","fretful","fretted","friction","friday","fridge","fried","friend","frighten","frightful","frigidity","frigidly","frill","fringe","frisbee","frisk","fritter","frivolous","frolic","from","front","frostbite","frosted","frostily","frosting","frostlike","frosty","froth","frown","frozen","fructose","frugality","frugally","fruit","frustrate","frying","gab","gaffe","gag","gainfully","gaining","gains","gala","gallantly","galleria","gallery","galley","gallon","gallows","gallstone","galore","galvanize","gambling","game","gaming","gamma","gander","gangly","gangrene","gangway","gap","garage","garbage","garden","gargle","garland","garlic","garment","garnet","garnish","garter","gas","gatherer","gathering","gating","gauging","gauntlet","gauze","gave","gawk","gazing","gear","gecko","geek","geiger","gem","gender","generic","generous","genetics","genre","gentile","gentleman","gently","gents","geography","geologic","geologist","geology","geometric","geometry","geranium","gerbil","geriatric","germicide","germinate","germless","germproof","gestate","gestation","gesture","getaway","getting","getup","giant","gibberish","giblet","giddily","giddiness","giddy","gift","gigabyte","gigahertz","gigantic","giggle","giggling","giggly","gigolo","gilled","gills","gimmick","girdle","giveaway","given","giver","giving","gizmo","gizzard","glacial","glacier","glade","gladiator","gladly","glamorous","glamour","glance","glancing","glandular","glare","glaring","glass","glaucoma","glazing","gleaming","gleeful","glider","gliding","glimmer","glimpse","glisten","glitch","glitter","glitzy","gloater","gloating","gloomily","gloomy","glorified","glorifier","glorify","glorious","glory","gloss","glove","glowing","glowworm","glucose","glue","gluten","glutinous","glutton","gnarly","gnat","goal","goatskin","goes","goggles","going","goldfish","goldmine","goldsmith","golf","goliath","gonad","gondola","gone","gong","good","gooey","goofball","goofiness","goofy","google","goon","gopher","gore","gorged","gorgeous","gory","gosling","gossip","gothic","gotten","gout","gown","grab","graceful","graceless","gracious","gradation","graded","grader","gradient","grading","gradually","graduate","graffiti","grafted","grafting","grain","granddad","grandkid","grandly","grandma","grandpa","grandson","granite","granny","granola","grant","granular","grape","graph","grapple","grappling","grasp","grass","gratified","gratify","grating","gratitude","gratuity","gravel","graveness","graves","graveyard","gravitate","gravity","gravy","gray","grazing","greasily","greedily","greedless","greedy","green","greeter","greeting","grew","greyhound","grid","grief","grievance","grieving","grievous","grill","grimace","grimacing","grime","griminess","grimy","grinch","grinning","grip","gristle","grit","groggily","groggy","groin","groom","groove","grooving","groovy","grope","ground","grouped","grout","grove","grower","growing","growl","grub","grudge","grudging","grueling","gruffly","grumble","grumbling","grumbly","grumpily","grunge","grunt","guacamole","guidable","guidance","guide","guiding","guileless","guise","gulf","gullible","gully","gulp","gumball","gumdrop","gumminess","gumming","gummy","gurgle","gurgling","guru","gush","gusto","gusty","gutless","guts","gutter","guy","guzzler","gyration","habitable","habitant","habitat","habitual","hacked","hacker","hacking","hacksaw","had","haggler","haiku","half","halogen","halt","halved","halves","hamburger","hamlet","hammock","hamper","hamster","hamstring","handbag","handball","handbook","handbrake","handcart","handclap","handclasp","handcraft","handcuff","handed","handful","handgrip","handgun","handheld","handiness","handiwork","handlebar","handled","handler","handling","handmade","handoff","handpick","handprint","handrail","handsaw","handset","handsfree","handshake","handstand","handwash","handwork","handwoven","handwrite","handyman","hangnail","hangout","hangover","hangup","hankering","hankie","hanky","haphazard","happening","happier","happiest","happily","happiness","happy","harbor","hardcopy","hardcore","hardcover","harddisk","hardened","hardener","hardening","hardhat","hardhead","hardiness","hardly","hardness","hardship","hardware","hardwired","hardwood","hardy","harmful","harmless","harmonica","harmonics","harmonize","harmony","harness","harpist","harsh","harvest","hash","hassle","haste","hastily","hastiness","hasty","hatbox","hatchback","hatchery","hatchet","hatching","hatchling","hate","hatless","hatred","haunt","haven","hazard","hazelnut","hazily","haziness","hazing","hazy","headache","headband","headboard","headcount","headdress","headed","header","headfirst","headgear","heading","headlamp","headless","headlock","headphone","headpiece","headrest","headroom","headscarf","headset","headsman","headstand","headstone","headway","headwear","heap","heat","heave","heavily","heaviness","heaving","hedge","hedging","heftiness","hefty","helium","helmet","helper","helpful","helping","helpless","helpline","hemlock","hemstitch","hence","henchman","henna","herald","herbal","herbicide","herbs","heritage","hermit","heroics","heroism","herring","herself","hertz","hesitancy","hesitant","hesitate","hexagon","hexagram","hubcap","huddle","huddling","huff","hug","hula","hulk","hull","human","humble","humbling","humbly","humid","humiliate","humility","humming","hummus","humongous","humorist","humorless","humorous","humpback","humped","humvee","hunchback","hundredth","hunger","hungrily","hungry","hunk","hunter","hunting","huntress","huntsman","hurdle","hurled","hurler","hurling","hurray","hurricane","hurried","hurry","hurt","husband","hush","husked","huskiness","hut","hybrid","hydrant","hydrated","hydration","hydrogen","hydroxide","hyperlink","hypertext","hyphen","hypnoses","hypnosis","hypnotic","hypnotism","hypnotist","hypnotize","hypocrisy","hypocrite","ibuprofen","ice","iciness","icing","icky","icon","icy","idealism","idealist","idealize","ideally","idealness","identical","identify","identity","ideology","idiocy","idiom","idly","igloo","ignition","ignore","iguana","illicitly","illusion","illusive","image","imaginary","imagines","imaging","imbecile","imitate","imitation","immature","immerse","immersion","imminent","immobile","immodest","immorally","immortal","immovable","immovably","immunity","immunize","impaired","impale","impart","impatient","impeach","impeding","impending","imperfect","imperial","impish","implant","implement","implicate","implicit","implode","implosion","implosive","imply","impolite","important","importer","impose","imposing","impotence","impotency","impotent","impound","imprecise","imprint","imprison","impromptu","improper","improve","improving","improvise","imprudent","impulse","impulsive","impure","impurity","iodine","iodize","ion","ipad","iphone","ipod","irate","irk","iron","irregular","irrigate","irritable","irritably","irritant","irritate","islamic","islamist","isolated","isolating","isolation","isotope","issue","issuing","italicize","italics","item","itinerary","itunes","ivory","ivy","jab","jackal","jacket","jackknife","jackpot","jailbird","jailbreak","jailer","jailhouse","jalapeno","jam","janitor","january","jargon","jarring","jasmine","jaundice","jaunt","java","jawed","jawless","jawline","jaws","jaybird","jaywalker","jazz","jeep","jeeringly","jellied","jelly","jersey","jester","jet","jiffy","jigsaw","jimmy","jingle","jingling","jinx","jitters","jittery","job","jockey","jockstrap","jogger","jogging","john","joining","jokester","jokingly","jolliness","jolly","jolt","jot","jovial","joyfully","joylessly","joyous","joyride","joystick","jubilance","jubilant","judge","judgingly","judicial","judiciary","judo","juggle","juggling","jugular","juice","juiciness","juicy","jujitsu","jukebox","july","jumble","jumbo","jump","junction","juncture","june","junior","juniper","junkie","junkman","junkyard","jurist","juror","jury","justice","justifier","justify","justly","justness","juvenile","kabob","kangaroo","karaoke","karate","karma","kebab","keenly","keenness","keep","keg","kelp","kennel","kept","kerchief","kerosene","kettle","kick","kiln","kilobyte","kilogram","kilometer","kilowatt","kilt","kimono","kindle","kindling","kindly","kindness","kindred","kinetic","kinfolk","king","kinship","kinsman","kinswoman","kissable","kisser","kissing","kitchen","kite","kitten","kitty","kiwi","kleenex","knapsack","knee","knelt","knickers","knoll","koala","kooky","kosher","krypton","kudos","kung","labored","laborer","laboring","laborious","labrador","ladder","ladies","ladle","ladybug","ladylike","lagged","lagging","lagoon","lair","lake","lance","landed","landfall","landfill","landing","landlady","landless","landline","landlord","landmark","landmass","landmine","landowner","landscape","landside","landslide","language","lankiness","lanky","lantern","lapdog","lapel","lapped","lapping","laptop","lard","large","lark","lash","lasso","last","latch","late","lather","latitude","latrine","latter","latticed","launch","launder","laundry","laurel","lavender","lavish","laxative","lazily","laziness","lazy","lecturer","left","legacy","legal","legend","legged","leggings","legible","legibly","legislate","lego","legroom","legume","legwarmer","legwork","lemon","lend","length","lens","lent","leotard","lesser","letdown","lethargic","lethargy","letter","lettuce","level","leverage","levers","levitate","levitator","liability","liable","liberty","librarian","library","licking","licorice","lid","life","lifter","lifting","liftoff","ligament","likely","likeness","likewise","liking","lilac","lilly","lily","limb","limeade","limelight","limes","limit","limping","limpness","line","lingo","linguini","linguist","lining","linked","linoleum","linseed","lint","lion","lip","liquefy","liqueur","liquid","lisp","list","litigate","litigator","litmus","litter","little","livable","lived","lively","liver","livestock","lividly","living","lizard","lubricant","lubricate","lucid","luckily","luckiness","luckless","lucrative","ludicrous","lugged","lukewarm","lullaby","lumber","luminance","luminous","lumpiness","lumping","lumpish","lunacy","lunar","lunchbox","luncheon","lunchroom","lunchtime","lung","lurch","lure","luridness","lurk","lushly","lushness","luster","lustfully","lustily","lustiness","lustrous","lusty","luxurious","luxury","lying","lyrically","lyricism","lyricist","lyrics","macarena","macaroni","macaw","mace","machine","machinist","magazine","magenta","maggot","magical","magician","magma","magnesium","magnetic","magnetism","magnetize","magnifier","magnify","magnitude","magnolia","mahogany","maimed","majestic","majesty","majorette","majority","makeover","maker","makeshift","making","malformed","malt","mama","mammal","mammary","mammogram","manager","managing","manatee","mandarin","mandate","mandatory","mandolin","manger","mangle","mango","mangy","manhandle","manhole","manhood","manhunt","manicotti","manicure","manifesto","manila","mankind","manlike","manliness","manly","manmade","manned","mannish","manor","manpower","mantis","mantra","manual","many","map","marathon","marauding","marbled","marbles","marbling","march","mardi","margarine","margarita","margin","marigold","marina","marine","marital","maritime","marlin","marmalade","maroon","married","marrow","marry","marshland","marshy","marsupial","marvelous","marxism","mascot","masculine","mashed","mashing","massager","masses","massive","mastiff","matador","matchbook","matchbox","matcher","matching","matchless","material","maternal","maternity","math","mating","matriarch","matrimony","matrix","matron","matted","matter","maturely","maturing","maturity","mauve","maverick","maximize","maximum","maybe","mayday","mayflower","moaner","moaning","mobile","mobility","mobilize","mobster","mocha","mocker","mockup","modified","modify","modular","modulator","module","moisten","moistness","moisture","molar","molasses","mold","molecular","molecule","molehill","mollusk","mom","monastery","monday","monetary","monetize","moneybags","moneyless","moneywise","mongoose","mongrel","monitor","monkhood","monogamy","monogram","monologue","monopoly","monorail","monotone","monotype","monoxide","monsieur","monsoon","monstrous","monthly","monument","moocher","moodiness","moody","mooing","moonbeam","mooned","moonlight","moonlike","moonlit","moonrise","moonscape","moonshine","moonstone","moonwalk","mop","morale","morality","morally","morbidity","morbidly","morphine","morphing","morse","mortality","mortally","mortician","mortified","mortify","mortuary","mosaic","mossy","most","mothball","mothproof","motion","motivate","motivator","motive","motocross","motor","motto","mountable","mountain","mounted","mounting","mourner","mournful","mouse","mousiness","moustache","mousy","mouth","movable","move","movie","moving","mower","mowing","much","muck","mud","mug","mulberry","mulch","mule","mulled","mullets","multiple","multiply","multitask","multitude","mumble","mumbling","mumbo","mummified","mummify","mummy","mumps","munchkin","mundane","municipal","muppet","mural","murkiness","murky","murmuring","muscular","museum","mushily","mushiness","mushroom","mushy","music","musket","muskiness","musky","mustang","mustard","muster","mustiness","musty","mutable","mutate","mutation","mute","mutilated","mutilator","mutiny","mutt","mutual","muzzle","myself","myspace","mystified","mystify","myth","nacho","nag","nail","name","naming","nanny","nanometer","nape","napkin","napped","napping","nappy","narrow","nastily","nastiness","national","native","nativity","natural","nature","naturist","nautical","navigate","navigator","navy","nearby","nearest","nearly","nearness","neatly","neatness","nebula","nebulizer","nectar","negate","negation","negative","neglector","negligee","negligent","negotiate","nemeses","nemesis","neon","nephew","nerd","nervous","nervy","nest","net","neurology","neuron","neurosis","neurotic","neuter","neutron","never","next","nibble","nickname","nicotine","niece","nifty","nimble","nimbly","nineteen","ninetieth","ninja","nintendo","ninth","nuclear","nuclei","nucleus","nugget","nullify","number","numbing","numbly","numbness","numeral","numerate","numerator","numeric","numerous","nuptials","nursery","nursing","nurture","nutcase","nutlike","nutmeg","nutrient","nutshell","nuttiness","nutty","nuzzle","nylon","oaf","oak","oasis","oat","obedience","obedient","obituary","object","obligate","obliged","oblivion","oblivious","oblong","obnoxious","oboe","obscure","obscurity","observant","observer","observing","obsessed","obsession","obsessive","obsolete","obstacle","obstinate","obstruct","obtain","obtrusive","obtuse","obvious","occultist","occupancy","occupant","occupier","occupy","ocean","ocelot","octagon","octane","october","octopus","ogle","oil","oink","ointment","okay","old","olive","olympics","omega","omen","ominous","omission","omit","omnivore","onboard","oncoming","ongoing","onion","online","onlooker","only","onscreen","onset","onshore","onslaught","onstage","onto","onward","onyx","oops","ooze","oozy","opacity","opal","open","operable","operate","operating","operation","operative","operator","opium","opossum","opponent","oppose","opposing","opposite","oppressed","oppressor","opt","opulently","osmosis","other","otter","ouch","ought","ounce","outage","outback","outbid","outboard","outbound","outbreak","outburst","outcast","outclass","outcome","outdated","outdoors","outer","outfield","outfit","outflank","outgoing","outgrow","outhouse","outing","outlast","outlet","outline","outlook","outlying","outmatch","outmost","outnumber","outplayed","outpost","outpour","output","outrage","outrank","outreach","outright","outscore","outsell","outshine","outshoot","outsider","outskirts","outsmart","outsource","outspoken","outtakes","outthink","outward","outweigh","outwit","oval","ovary","oven","overact","overall","overarch","overbid","overbill","overbite","overblown","overboard","overbook","overbuilt","overcast","overcoat","overcome","overcook","overcrowd","overdraft","overdrawn","overdress","overdrive","overdue","overeager","overeater","overexert","overfed","overfeed","overfill","overflow","overfull","overgrown","overhand","overhang","overhaul","overhead","overhear","overheat","overhung","overjoyed","overkill","overlabor","overlaid","overlap","overlay","overload","overlook","overlord","overlying","overnight","overpass","overpay","overplant","overplay","overpower","overprice","overrate","overreach","overreact","override","overripe","overrule","overrun","overshoot","overshot","oversight","oversized","oversleep","oversold","overspend","overstate","overstay","overstep","overstock","overstuff","oversweet","overtake","overthrow","overtime","overtly","overtone","overture","overturn","overuse","overvalue","overview","overwrite","owl","oxford","oxidant","oxidation","oxidize","oxidizing","oxygen","oxymoron","oyster","ozone","paced","pacemaker","pacific","pacifier","pacifism","pacifist","pacify","padded","padding","paddle","paddling","padlock","pagan","pager","paging","pajamas","palace","palatable","palm","palpable","palpitate","paltry","pampered","pamperer","pampers","pamphlet","panama","pancake","pancreas","panda","pandemic","pang","panhandle","panic","panning","panorama","panoramic","panther","pantomime","pantry","pants","pantyhose","paparazzi","papaya","paper","paprika","papyrus","parabola","parachute","parade","paradox","paragraph","parakeet","paralegal","paralyses","paralysis","paralyze","paramedic","parameter","paramount","parasail","parasite","parasitic","parcel","parched","parchment","pardon","parish","parka","parking","parkway","parlor","parmesan","parole","parrot","parsley","parsnip","partake","parted","parting","partition","partly","partner","partridge","party","passable","passably","passage","passcode","passenger","passerby","passing","passion","passive","passivism","passover","passport","password","pasta","pasted","pastel","pastime","pastor","pastrami","pasture","pasty","patchwork","patchy","paternal","paternity","path","patience","patient","patio","patriarch","patriot","patrol","patronage","patronize","pauper","pavement","paver","pavestone","pavilion","paving","pawing","payable","payback","paycheck","payday","payee","payer","paying","payment","payphone","payroll","pebble","pebbly","pecan","pectin","peculiar","peddling","pediatric","pedicure","pedigree","pedometer","pegboard","pelican","pellet","pelt","pelvis","penalize","penalty","pencil","pendant","pending","penholder","penknife","pennant","penniless","penny","penpal","pension","pentagon","pentagram","pep","perceive","percent","perch","percolate","perennial","perfected","perfectly","perfume","periscope","perish","perjurer","perjury","perkiness","perky","perm","peroxide","perpetual","perplexed","persecute","persevere","persuaded","persuader","pesky","peso","pessimism","pessimist","pester","pesticide","petal","petite","petition","petri","petroleum","petted","petticoat","pettiness","petty","petunia","phantom","phobia","phoenix","phonebook","phoney","phonics","phoniness","phony","phosphate","photo","phrase","phrasing","placard","placate","placidly","plank","planner","plant","plasma","plaster","plastic","plated","platform","plating","platinum","platonic","platter","platypus","plausible","plausibly","playable","playback","player","playful","playgroup","playhouse","playing","playlist","playmaker","playmate","playoff","playpen","playroom","playset","plaything","playtime","plaza","pleading","pleat","pledge","plentiful","plenty","plethora","plexiglas","pliable","plod","plop","plot","plow","ploy","pluck","plug","plunder","plunging","plural","plus","plutonium","plywood","poach","pod","poem","poet","pogo","pointed","pointer","pointing","pointless","pointy","poise","poison","poker","poking","polar","police","policy","polio","polish","politely","polka","polo","polyester","polygon","polygraph","polymer","poncho","pond","pony","popcorn","pope","poplar","popper","poppy","popsicle","populace","popular","populate","porcupine","pork","porous","porridge","portable","portal","portfolio","porthole","portion","portly","portside","poser","posh","posing","possible","possibly","possum","postage","postal","postbox","postcard","posted","poster","posting","postnasal","posture","postwar","pouch","pounce","pouncing","pound","pouring","pout","powdered","powdering","powdery","power","powwow","pox","praising","prance","prancing","pranker","prankish","prankster","prayer","praying","preacher","preaching","preachy","preamble","precinct","precise","precision","precook","precut","predator","predefine","predict","preface","prefix","preflight","preformed","pregame","pregnancy","pregnant","preheated","prelaunch","prelaw","prelude","premiere","premises","premium","prenatal","preoccupy","preorder","prepaid","prepay","preplan","preppy","preschool","prescribe","preseason","preset","preshow","president","presoak","press","presume","presuming","preteen","pretended","pretender","pretense","pretext","pretty","pretzel","prevail","prevalent","prevent","preview","previous","prewar","prewashed","prideful","pried","primal","primarily","primary","primate","primer","primp","princess","print","prior","prism","prison","prissy","pristine","privacy","private","privatize","prize","proactive","probable","probably","probation","probe","probing","probiotic","problem","procedure","process","proclaim","procreate","procurer","prodigal","prodigy","produce","product","profane","profanity","professed","professor","profile","profound","profusely","progeny","prognosis","program","progress","projector","prologue","prolonged","promenade","prominent","promoter","promotion","prompter","promptly","prone","prong","pronounce","pronto","proofing","proofread","proofs","propeller","properly","property","proponent","proposal","propose","props","prorate","protector","protegee","proton","prototype","protozoan","protract","protrude","proud","provable","proved","proven","provided","provider","providing","province","proving","provoke","provoking","provolone","prowess","prowler","prowling","proximity","proxy","prozac","prude","prudishly","prune","pruning","pry","psychic","public","publisher","pucker","pueblo","pug","pull","pulmonary","pulp","pulsate","pulse","pulverize","puma","pumice","pummel","punch","punctual","punctuate","punctured","pungent","punisher","punk","pupil","puppet","puppy","purchase","pureblood","purebred","purely","pureness","purgatory","purge","purging","purifier","purify","purist","puritan","purity","purple","purplish","purposely","purr","purse","pursuable","pursuant","pursuit","purveyor","pushcart","pushchair","pusher","pushiness","pushing","pushover","pushpin","pushup","pushy","putdown","putt","puzzle","puzzling","pyramid","pyromania","python","quack","quadrant","quail","quaintly","quake","quaking","qualified","qualifier","qualify","quality","qualm","quantum","quarrel","quarry","quartered","quarterly","quarters","quartet","quench","query","quicken","quickly","quickness","quicksand","quickstep","quiet","quill","quilt","quintet","quintuple","quirk","quit","quiver","quizzical","quotable","quotation","quote","rabid","race","racing","racism","rack","racoon","radar","radial","radiance","radiantly","radiated","radiation","radiator","radio","radish","raffle","raft","rage","ragged","raging","ragweed","raider","railcar","railing","railroad","railway","raisin","rake","raking","rally","ramble","rambling","ramp","ramrod","ranch","rancidity","random","ranged","ranger","ranging","ranked","ranking","ransack","ranting","rants","rare","rarity","rascal","rash","rasping","ravage","raven","ravine","raving","ravioli","ravishing","reabsorb","reach","reacquire","reaction","reactive","reactor","reaffirm","ream","reanalyze","reappear","reapply","reappoint","reapprove","rearrange","rearview","reason","reassign","reassure","reattach","reawake","rebalance","rebate","rebel","rebirth","reboot","reborn","rebound","rebuff","rebuild","rebuilt","reburial","rebuttal","recall","recant","recapture","recast","recede","recent","recess","recharger","recipient","recital","recite","reckless","reclaim","recliner","reclining","recluse","reclusive","recognize","recoil","recollect","recolor","reconcile","reconfirm","reconvene","recopy","record","recount","recoup","recovery","recreate","rectal","rectangle","rectified","rectify","recycled","recycler","recycling","reemerge","reenact","reenter","reentry","reexamine","referable","referee","reference","refill","refinance","refined","refinery","refining","refinish","reflected","reflector","reflex","reflux","refocus","refold","reforest","reformat","reformed","reformer","reformist","refract","refrain","refreeze","refresh","refried","refueling","refund","refurbish","refurnish","refusal","refuse","refusing","refutable","refute","regain","regalia","regally","reggae","regime","region","register","registrar","registry","regress","regretful","regroup","regular","regulate","regulator","rehab","reheat","rehire","rehydrate","reimburse","reissue","reiterate","rejoice","rejoicing","rejoin","rekindle","relapse","relapsing","relatable","related","relation","relative","relax","relay","relearn","release","relenting","reliable","reliably","reliance","reliant","relic","relieve","relieving","relight","relish","relive","reload","relocate","relock","reluctant","rely","remake","remark","remarry","rematch","remedial","remedy","remember","reminder","remindful","remission","remix","remnant","remodeler","remold","remorse","remote","removable","removal","removed","remover","removing","rename","renderer","rendering","rendition","renegade","renewable","renewably","renewal","renewed","renounce","renovate","renovator","rentable","rental","rented","renter","reoccupy","reoccur","reopen","reorder","repackage","repacking","repaint","repair","repave","repaying","repayment","repeal","repeated","repeater","repent","rephrase","replace","replay","replica","reply","reporter","repose","repossess","repost","repressed","reprimand","reprint","reprise","reproach","reprocess","reproduce","reprogram","reps","reptile","reptilian","repugnant","repulsion","repulsive","repurpose","reputable","reputably","request","require","requisite","reroute","rerun","resale","resample","rescuer","reseal","research","reselect","reseller","resemble","resend","resent","reset","reshape","reshoot","reshuffle","residence","residency","resident","residual","residue","resigned","resilient","resistant","resisting","resize","resolute","resolved","resonant","resonate","resort","resource","respect","resubmit","result","resume","resupply","resurface","resurrect","retail","retainer","retaining","retake","retaliate","retention","rethink","retinal","retired","retiree","retiring","retold","retool","retorted","retouch","retrace","retract","retrain","retread","retreat","retrial","retrieval","retriever","retry","return","retying","retype","reunion","reunite","reusable","reuse","reveal","reveler","revenge","revenue","reverb","revered","reverence","reverend","reversal","reverse","reversing","reversion","revert","revisable","revise","revision","revisit","revivable","revival","reviver","reviving","revocable","revoke","revolt","revolver","revolving","reward","rewash","rewind","rewire","reword","rework","rewrap","rewrite","rhyme","ribbon","ribcage","rice","riches","richly","richness","rickety","ricotta","riddance","ridden","ride","riding","rifling","rift","rigging","rigid","rigor","rimless","rimmed","rind","rink","rinse","rinsing","riot","ripcord","ripeness","ripening","ripping","ripple","rippling","riptide","rise","rising","risk","risotto","ritalin","ritzy","rival","riverbank","riverbed","riverboat","riverside","riveter","riveting","roamer","roaming","roast","robbing","robe","robin","robotics","robust","rockband","rocker","rocket","rockfish","rockiness","rocking","rocklike","rockslide","rockstar","rocky","rogue","roman","romp","rope","roping","roster","rosy","rotten","rotting","rotunda","roulette","rounding","roundish","roundness","roundup","roundworm","routine","routing","rover","roving","royal","rubbed","rubber","rubbing","rubble","rubdown","ruby","ruckus","rudder","rug","ruined","rule","rumble","rumbling","rummage","rumor","runaround","rundown","runner","running","runny","runt","runway","rupture","rural","ruse","rush","rust","rut","sabbath","sabotage","sacrament","sacred","sacrifice","sadden","saddlebag","saddled","saddling","sadly","sadness","safari","safeguard","safehouse","safely","safeness","saffron","saga","sage","sagging","saggy","said","saint","sake","salad","salami","salaried","salary","saline","salon","saloon","salsa","salt","salutary","salute","salvage","salvaging","salvation","same","sample","sampling","sanction","sanctity","sanctuary","sandal","sandbag","sandbank","sandbar","sandblast","sandbox","sanded","sandfish","sanding","sandlot","sandpaper","sandpit","sandstone","sandstorm","sandworm","sandy","sanitary","sanitizer","sank","santa","sapling","sappiness","sappy","sarcasm","sarcastic","sardine","sash","sasquatch","sassy","satchel","satiable","satin","satirical","satisfied","satisfy","saturate","saturday","sauciness","saucy","sauna","savage","savanna","saved","savings","savior","savor","saxophone","say","scabbed","scabby","scalded","scalding","scale","scaling","scallion","scallop","scalping","scam","scandal","scanner","scanning","scant","scapegoat","scarce","scarcity","scarecrow","scared","scarf","scarily","scariness","scarring","scary","scavenger","scenic","schedule","schematic","scheme","scheming","schilling","schnapps","scholar","science","scientist","scion","scoff","scolding","scone","scoop","scooter","scope","scorch","scorebook","scorecard","scored","scoreless","scorer","scoring","scorn","scorpion","scotch","scoundrel","scoured","scouring","scouting","scouts","scowling","scrabble","scraggly","scrambled","scrambler","scrap","scratch","scrawny","screen","scribble","scribe","scribing","scrimmage","script","scroll","scrooge","scrounger","scrubbed","scrubber","scruffy","scrunch","scrutiny","scuba","scuff","sculptor","sculpture","scurvy","scuttle","secluded","secluding","seclusion","second","secrecy","secret","sectional","sector","secular","securely","security","sedan","sedate","sedation","sedative","sediment","seduce","seducing","segment","seismic","seizing","seldom","selected","selection","selective","selector","self","seltzer","semantic","semester","semicolon","semifinal","seminar","semisoft","semisweet","senate","senator","send","senior","senorita","sensation","sensitive","sensitize","sensually","sensuous","sepia","september","septic","septum","sequel","sequence","sequester","series","sermon","serotonin","serpent","serrated","serve","service","serving","sesame","sessions","setback","setting","settle","settling","setup","sevenfold","seventeen","seventh","seventy","severity","shabby","shack","shaded","shadily","shadiness","shading","shadow","shady","shaft","shakable","shakily","shakiness","shaking","shaky","shale","shallot","shallow","shame","shampoo","shamrock","shank","shanty","shape","shaping","share","sharpener","sharper","sharpie","sharply","sharpness","shawl","sheath","shed","sheep","sheet","shelf","shell","shelter","shelve","shelving","sherry","shield","shifter","shifting","shiftless","shifty","shimmer","shimmy","shindig","shine","shingle","shininess","shining","shiny","ship","shirt","shivering","shock","shone","shoplift","shopper","shopping","shoptalk","shore","shortage","shortcake","shortcut","shorten","shorter","shorthand","shortlist","shortly","shortness","shorts","shortwave","shorty","shout","shove","showbiz","showcase","showdown","shower","showgirl","showing","showman","shown","showoff","showpiece","showplace","showroom","showy","shrank","shrapnel","shredder","shredding","shrewdly","shriek","shrill","shrimp","shrine","shrink","shrivel","shrouded","shrubbery","shrubs","shrug","shrunk","shucking","shudder","shuffle","shuffling","shun","shush","shut","shy","siamese","siberian","sibling","siding","sierra","siesta","sift","sighing","silenced","silencer","silent","silica","silicon","silk","silliness","silly","silo","silt","silver","similarly","simile","simmering","simple","simplify","simply","sincere","sincerity","singer","singing","single","singular","sinister","sinless","sinner","sinuous","sip","siren","sister","sitcom","sitter","sitting","situated","situation","sixfold","sixteen","sixth","sixties","sixtieth","sixtyfold","sizable","sizably","size","sizing","sizzle","sizzling","skater","skating","skedaddle","skeletal","skeleton","skeptic","sketch","skewed","skewer","skid","skied","skier","skies","skiing","skilled","skillet","skillful","skimmed","skimmer","skimming","skimpily","skincare","skinhead","skinless","skinning","skinny","skintight","skipper","skipping","skirmish","skirt","skittle","skydiver","skylight","skyline","skype","skyrocket","skyward","slab","slacked","slacker","slacking","slackness","slacks","slain","slam","slander","slang","slapping","slapstick","slashed","slashing","slate","slather","slaw","sled","sleek","sleep","sleet","sleeve","slept","sliceable","sliced","slicer","slicing","slick","slider","slideshow","sliding","slighted","slighting","slightly","slimness","slimy","slinging","slingshot","slinky","slip","slit","sliver","slobbery","slogan","sloped","sloping","sloppily","sloppy","slot","slouching","slouchy","sludge","slug","slum","slurp","slush","sly","small","smartly","smartness","smasher","smashing","smashup","smell","smelting","smile","smilingly","smirk","smite","smith","smitten","smock","smog","smoked","smokeless","smokiness","smoking","smoky","smolder","smooth","smother","smudge","smudgy","smuggler","smuggling","smugly","smugness","snack","snagged","snaking","snap","snare","snarl","snazzy","sneak","sneer","sneeze","sneezing","snide","sniff","snippet","snipping","snitch","snooper","snooze","snore","snoring","snorkel","snort","snout","snowbird","snowboard","snowbound","snowcap","snowdrift","snowdrop","snowfall","snowfield","snowflake","snowiness","snowless","snowman","snowplow","snowshoe","snowstorm","snowsuit","snowy","snub","snuff","snuggle","snugly","snugness","speak","spearfish","spearhead","spearman","spearmint","species","specimen","specked","speckled","specks","spectacle","spectator","spectrum","speculate","speech","speed","spellbind","speller","spelling","spendable","spender","spending","spent","spew","sphere","spherical","sphinx","spider","spied","spiffy","spill","spilt","spinach","spinal","spindle","spinner","spinning","spinout","spinster","spiny","spiral","spirited","spiritism","spirits","spiritual","splashed","splashing","splashy","splatter","spleen","splendid","splendor","splice","splicing","splinter","splotchy","splurge","spoilage","spoiled","spoiler","spoiling","spoils","spoken","spokesman","sponge","spongy","sponsor","spoof","spookily","spooky","spool","spoon","spore","sporting","sports","sporty","spotless","spotlight","spotted","spotter","spotting","spotty","spousal","spouse","spout","sprain","sprang","sprawl","spray","spree","sprig","spring","sprinkled","sprinkler","sprint","sprite","sprout","spruce","sprung","spry","spud","spur","sputter","spyglass","squabble","squad","squall","squander","squash","squatted","squatter","squatting","squeak","squealer","squealing","squeamish","squeegee","squeeze","squeezing","squid","squiggle","squiggly","squint","squire","squirt","squishier","squishy","stability","stabilize","stable","stack","stadium","staff","stage","staging","stagnant","stagnate","stainable","stained","staining","stainless","stalemate","staleness","stalling","stallion","stamina","stammer","stamp","stand","stank","staple","stapling","starboard","starch","stardom","stardust","starfish","stargazer","staring","stark","starless","starlet","starlight","starlit","starring","starry","starship","starter","starting","startle","startling","startup","starved","starving","stash","state","static","statistic","statue","stature","status","statute","statutory","staunch","stays","steadfast","steadier","steadily","steadying","steam","steed","steep","steerable","steering","steersman","stegosaur","stellar","stem","stench","stencil","step","stereo","sterile","sterility","sterilize","sterling","sternness","sternum","stew","stick","stiffen","stiffly","stiffness","stifle","stifling","stillness","stilt","stimulant","stimulate","stimuli","stimulus","stinger","stingily","stinging","stingray","stingy","stinking","stinky","stipend","stipulate","stir","stitch","stock","stoic","stoke","stole","stomp","stonewall","stoneware","stonework","stoning","stony","stood","stooge","stool","stoop","stoplight","stoppable","stoppage","stopped","stopper","stopping","stopwatch","storable","storage","storeroom","storewide","storm","stout","stove","stowaway","stowing","straddle","straggler","strained","strainer","straining","strangely","stranger","strangle","strategic","strategy","stratus","straw","stray","streak","stream","street","strength","strenuous","strep","stress","stretch","strewn","stricken","strict","stride","strife","strike","striking","strive","striving","strobe","strode","stroller","strongbox","strongly","strongman","struck","structure","strudel","struggle","strum","strung","strut","stubbed","stubble","stubbly","stubborn","stucco","stuck","student","studied","studio","study","stuffed","stuffing","stuffy","stumble","stumbling","stump","stung","stunned","stunner","stunning","stunt","stupor","sturdily","sturdy","styling","stylishly","stylist","stylized","stylus","suave","subarctic","subatomic","subdivide","subdued","subduing","subfloor","subgroup","subheader","subject","sublease","sublet","sublevel","sublime","submarine","submerge","submersed","submitter","subpanel","subpar","subplot","subprime","subscribe","subscript","subsector","subside","subsiding","subsidize","subsidy","subsoil","subsonic","substance","subsystem","subtext","subtitle","subtly","subtotal","subtract","subtype","suburb","subway","subwoofer","subzero","succulent","such","suction","sudden","sudoku","suds","sufferer","suffering","suffice","suffix","suffocate","suffrage","sugar","suggest","suing","suitable","suitably","suitcase","suitor","sulfate","sulfide","sulfite","sulfur","sulk","sullen","sulphate","sulphuric","sultry","superbowl","superglue","superhero","superior","superjet","superman","supermom","supernova","supervise","supper","supplier","supply","support","supremacy","supreme","surcharge","surely","sureness","surface","surfacing","surfboard","surfer","surgery","surgical","surging","surname","surpass","surplus","surprise","surreal","surrender","surrogate","surround","survey","survival","survive","surviving","survivor","sushi","suspect","suspend","suspense","sustained","sustainer","swab","swaddling","swagger","swampland","swan","swapping","swarm","sway","swear","sweat","sweep","swell","swept","swerve","swifter","swiftly","swiftness","swimmable","swimmer","swimming","swimsuit","swimwear","swinger","swinging","swipe","swirl","switch","swivel","swizzle","swooned","swoop","swoosh","swore","sworn","swung","sycamore","sympathy","symphonic","symphony","symptom","synapse","syndrome","synergy","synopses","synopsis","synthesis","synthetic","syrup","system","t-shirt","tabasco","tabby","tableful","tables","tablet","tableware","tabloid","tackiness","tacking","tackle","tackling","tacky","taco","tactful","tactical","tactics","tactile","tactless","tadpole","taekwondo","tag","tainted","take","taking","talcum","talisman","tall","talon","tamale","tameness","tamer","tamper","tank","tanned","tannery","tanning","tantrum","tapeless","tapered","tapering","tapestry","tapioca","tapping","taps","tarantula","target","tarmac","tarnish","tarot","tartar","tartly","tartness","task","tassel","taste","tastiness","tasting","tasty","tattered","tattle","tattling","tattoo","taunt","tavern","thank","that","thaw","theater","theatrics","thee","theft","theme","theology","theorize","thermal","thermos","thesaurus","these","thesis","thespian","thicken","thicket","thickness","thieving","thievish","thigh","thimble","thing","think","thinly","thinner","thinness","thinning","thirstily","thirsting","thirsty","thirteen","thirty","thong","thorn","those","thousand","thrash","thread","threaten","threefold","thrift","thrill","thrive","thriving","throat","throbbing","throng","throttle","throwaway","throwback","thrower","throwing","thud","thumb","thumping","thursday","thus","thwarting","thyself","tiara","tibia","tidal","tidbit","tidiness","tidings","tidy","tiger","tighten","tightly","tightness","tightrope","tightwad","tigress","tile","tiling","till","tilt","timid","timing","timothy","tinderbox","tinfoil","tingle","tingling","tingly","tinker","tinkling","tinsel","tinsmith","tint","tinwork","tiny","tipoff","tipped","tipper","tipping","tiptoeing","tiptop","tiring","tissue","trace","tracing","track","traction","tractor","trade","trading","tradition","traffic","tragedy","trailing","trailside","train","traitor","trance","tranquil","transfer","transform","translate","transpire","transport","transpose","trapdoor","trapeze","trapezoid","trapped","trapper","trapping","traps","trash","travel","traverse","travesty","tray","treachery","treading","treadmill","treason","treat","treble","tree","trekker","tremble","trembling","tremor","trench","trend","trespass","triage","trial","triangle","tribesman","tribunal","tribune","tributary","tribute","triceps","trickery","trickily","tricking","trickle","trickster","tricky","tricolor","tricycle","trident","tried","trifle","trifocals","trillion","trilogy","trimester","trimmer","trimming","trimness","trinity","trio","tripod","tripping","triumph","trivial","trodden","trolling","trombone","trophy","tropical","tropics","trouble","troubling","trough","trousers","trout","trowel","truce","truck","truffle","trump","trunks","trustable","trustee","trustful","trusting","trustless","truth","try","tubby","tubeless","tubular","tucking","tuesday","tug","tuition","tulip","tumble","tumbling","tummy","turban","turbine","turbofan","turbojet","turbulent","turf","turkey","turmoil","turret","turtle","tusk","tutor","tutu","tux","tweak","tweed","tweet","tweezers","twelve","twentieth","twenty","twerp","twice","twiddle","twiddling","twig","twilight","twine","twins","twirl","twistable","twisted","twister","twisting","twisty","twitch","twitter","tycoon","tying","tyke","udder","ultimate","ultimatum","ultra","umbilical","umbrella","umpire","unabashed","unable","unadorned","unadvised","unafraid","unaired","unaligned","unaltered","unarmored","unashamed","unaudited","unawake","unaware","unbaked","unbalance","unbeaten","unbend","unbent","unbiased","unbitten","unblended","unblessed","unblock","unbolted","unbounded","unboxed","unbraided","unbridle","unbroken","unbuckled","unbundle","unburned","unbutton","uncanny","uncapped","uncaring","uncertain","unchain","unchanged","uncharted","uncheck","uncivil","unclad","unclaimed","unclamped","unclasp","uncle","unclip","uncloak","unclog","unclothed","uncoated","uncoiled","uncolored","uncombed","uncommon","uncooked","uncork","uncorrupt","uncounted","uncouple","uncouth","uncover","uncross","uncrown","uncrushed","uncured","uncurious","uncurled","uncut","undamaged","undated","undaunted","undead","undecided","undefined","underage","underarm","undercoat","undercook","undercut","underdog","underdone","underfed","underfeed","underfoot","undergo","undergrad","underhand","underline","underling","undermine","undermost","underpaid","underpass","underpay","underrate","undertake","undertone","undertook","undertow","underuse","underwear","underwent","underwire","undesired","undiluted","undivided","undocked","undoing","undone","undrafted","undress","undrilled","undusted","undying","unearned","unearth","unease","uneasily","uneasy","uneatable","uneaten","unedited","unelected","unending","unengaged","unenvied","unequal","unethical","uneven","unexpired","unexposed","unfailing","unfair","unfasten","unfazed","unfeeling","unfiled","unfilled","unfitted","unfitting","unfixable","unfixed","unflawed","unfocused","unfold","unfounded","unframed","unfreeze","unfrosted","unfrozen","unfunded","unglazed","ungloved","unglue","ungodly","ungraded","ungreased","unguarded","unguided","unhappily","unhappy","unharmed","unhealthy","unheard","unhearing","unheated","unhelpful","unhidden","unhinge","unhitched","unholy","unhook","unicorn","unicycle","unified","unifier","uniformed","uniformly","unify","unimpeded","uninjured","uninstall","uninsured","uninvited","union","uniquely","unisexual","unison","unissued","unit","universal","universe","unjustly","unkempt","unkind","unknotted","unknowing","unknown","unlaced","unlatch","unlawful","unleaded","unlearned","unleash","unless","unleveled","unlighted","unlikable","unlimited","unlined","unlinked","unlisted","unlit","unlivable","unloaded","unloader","unlocked","unlocking","unlovable","unloved","unlovely","unloving","unluckily","unlucky","unmade","unmanaged","unmanned","unmapped","unmarked","unmasked","unmasking","unmatched","unmindful","unmixable","unmixed","unmolded","unmoral","unmovable","unmoved","unmoving","unnamable","unnamed","unnatural","unneeded","unnerve","unnerving","unnoticed","unopened","unopposed","unpack","unpadded","unpaid","unpainted","unpaired","unpaved","unpeeled","unpicked","unpiloted","unpinned","unplanned","unplanted","unpleased","unpledged","unplowed","unplug","unpopular","unproven","unquote","unranked","unrated","unraveled","unreached","unread","unreal","unreeling","unrefined","unrelated","unrented","unrest","unretired","unrevised","unrigged","unripe","unrivaled","unroasted","unrobed","unroll","unruffled","unruly","unrushed","unsaddle","unsafe","unsaid","unsalted","unsaved","unsavory","unscathed","unscented","unscrew","unsealed","unseated","unsecured","unseeing","unseemly","unseen","unselect","unselfish","unsent","unsettled","unshackle","unshaken","unshaved","unshaven","unsheathe","unshipped","unsightly","unsigned","unskilled","unsliced","unsmooth","unsnap","unsocial","unsoiled","unsold","unsolved","unsorted","unspoiled","unspoken","unstable","unstaffed","unstamped","unsteady","unsterile","unstirred","unstitch","unstopped","unstuck","unstuffed","unstylish","unsubtle","unsubtly","unsuited","unsure","unsworn","untagged","untainted","untaken","untamed","untangled","untapped","untaxed","unthawed","unthread","untidy","untie","until","untimed","untimely","untitled","untoasted","untold","untouched","untracked","untrained","untreated","untried","untrimmed","untrue","untruth","unturned","untwist","untying","unusable","unused","unusual","unvalued","unvaried","unvarying","unveiled","unveiling","unvented","unviable","unvisited","unvocal","unwanted","unwarlike","unwary","unwashed","unwatched","unweave","unwed","unwelcome","unwell","unwieldy","unwilling","unwind","unwired","unwitting","unwomanly","unworldly","unworn","unworried","unworthy","unwound","unwoven","unwrapped","unwritten","unzip","upbeat","upchuck","upcoming","upcountry","update","upfront","upgrade","upheaval","upheld","uphill","uphold","uplifted","uplifting","upload","upon","upper","upright","uprising","upriver","uproar","uproot","upscale","upside","upstage","upstairs","upstart","upstate","upstream","upstroke","upswing","uptake","uptight","uptown","upturned","upward","upwind","uranium","urban","urchin","urethane","urgency","urgent","urging","urologist","urology","usable","usage","useable","used","uselessly","user","usher","usual","utensil","utility","utilize","utmost","utopia","utter","vacancy","vacant","vacate","vacation","vagabond","vagrancy","vagrantly","vaguely","vagueness","valiant","valid","valium","valley","valuables","value","vanilla","vanish","vanity","vanquish","vantage","vaporizer","variable","variably","varied","variety","various","varmint","varnish","varsity","varying","vascular","vaseline","vastly","vastness","veal","vegan","veggie","vehicular","velcro","velocity","velvet","vendetta","vending","vendor","veneering","vengeful","venomous","ventricle","venture","venue","venus","verbalize","verbally","verbose","verdict","verify","verse","version","versus","vertebrae","vertical","vertigo","very","vessel","vest","veteran","veto","vexingly","viability","viable","vibes","vice","vicinity","victory","video","viewable","viewer","viewing","viewless","viewpoint","vigorous","village","villain","vindicate","vineyard","vintage","violate","violation","violator","violet","violin","viper","viral","virtual","virtuous","virus","visa","viscosity","viscous","viselike","visible","visibly","vision","visiting","visitor","visor","vista","vitality","vitalize","vitally","vitamins","vivacious","vividly","vividness","vixen","vocalist","vocalize","vocally","vocation","voice","voicing","void","volatile","volley","voltage","volumes","voter","voting","voucher","vowed","vowel","voyage","wackiness","wad","wafer","waffle","waged","wager","wages","waggle","wagon","wake","waking","walk","walmart","walnut","walrus","waltz","wand","wannabe","wanted","wanting","wasabi","washable","washbasin","washboard","washbowl","washcloth","washday","washed","washer","washhouse","washing","washout","washroom","washstand","washtub","wasp","wasting","watch","water","waviness","waving","wavy","whacking","whacky","wham","wharf","wheat","whenever","whiff","whimsical","whinny","whiny","whisking","whoever","whole","whomever","whoopee","whooping","whoops","why","wick","widely","widen","widget","widow","width","wieldable","wielder","wife","wifi","wikipedia","wildcard","wildcat","wilder","wildfire","wildfowl","wildland","wildlife","wildly","wildness","willed","willfully","willing","willow","willpower","wilt","wimp","wince","wincing","wind","wing","winking","winner","winnings","winter","wipe","wired","wireless","wiring","wiry","wisdom","wise","wish","wisplike","wispy","wistful","wizard","wobble","wobbling","wobbly","wok","wolf","wolverine","womanhood","womankind","womanless","womanlike","womanly","womb","woof","wooing","wool","woozy","word","work","worried","worrier","worrisome","worry","worsening","worshiper","worst","wound","woven","wow","wrangle","wrath","wreath","wreckage","wrecker","wrecking","wrench","wriggle","wriggly","wrinkle","wrinkly","wrist","writing","written","wrongdoer","wronged","wrongful","wrongly","wrongness","wrought","xbox","xerox","yahoo","yam","yanking","yapping","yard","yarn","yeah","yearbook","yearling","yearly","yearning","yeast","yelling","yelp","yen","yesterday","yiddish","yield","yin","yippee","yo-yo","yodel","yoga","yogurt","yonder","yoyo","yummy","zap","zealous","zebra","zen","zeppelin","zero","zestfully","zesty","zigzagged","zipfile","zipping","zippy","zips","zit","zodiac","zombie","zone","zoning","zookeeper","zoologist","zoology","zoom"]

},{}],3:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],4:[function(require,module,exports){
module.exports = function(haystack, needle, comparator, low, high) {
  var mid, cmp;

  if(low === undefined)
    low = 0;

  else {
    low = low|0;
    if(low < 0 || low >= haystack.length)
      throw new RangeError("invalid lower bound");
  }

  if(high === undefined)
    high = haystack.length - 1;

  else {
    high = high|0;
    if(high < low || high >= haystack.length)
      throw new RangeError("invalid upper bound");
  }

  while(low <= high) {
    // The naive `low + high >>> 1` could fail for array lengths > 2**31
    // because `>>>` converts its operands to int32. `low + (high - low >>> 1)`
    // works for array lengths <= 2**32-1 which is also Javascript's max array
    // length.
    mid = low + ((high - low) >>> 1);
    cmp = +comparator(haystack[mid], needle, mid, haystack);

    // Too low.
    if(cmp < 0.0)
      low  = mid + 1;

    // Too high.
    else if(cmp > 0.0)
      high = mid - 1;

    // Key found.
    else
      return mid;
  }

  // Key not found.
  return ~low;
}

},{}],5:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":3,"buffer":5,"ieee754":6}],6:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],7:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],8:[function(require,module,exports){
(function (process,global){(function (){
'use strict'

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
var MAX_BYTES = 65536

// Node supports requesting up to this number of bytes
// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
var MAX_UINT32 = 4294967295

function oldBrowser () {
  throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11')
}

var Buffer = require('safe-buffer').Buffer
var crypto = global.crypto || global.msCrypto

if (crypto && crypto.getRandomValues) {
  module.exports = randomBytes
} else {
  module.exports = oldBrowser
}

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > MAX_UINT32) throw new RangeError('requested too many random bytes')

  var bytes = Buffer.allocUnsafe(size)

  if (size > 0) {  // getRandomValues fails on IE if size == 0
    if (size > MAX_BYTES) { // this is the max bytes crypto.getRandomValues
      // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
      for (var generated = 0; generated < size; generated += MAX_BYTES) {
        // buffer.slice automatically checks if the end is past the end of
        // the buffer so we don't have to here
        crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES))
      }
    } else {
      crypto.getRandomValues(bytes)
    }
  }

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes)
    })
  }

  return bytes
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":7,"safe-buffer":9}],9:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":5}]},{},[1]);
