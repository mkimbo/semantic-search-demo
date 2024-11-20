import * as cheerio from "cheerio";
import axios from "axios";

import updateInstagramLeads from "./updateInstagramLeads.js";
import getAllInstaLeads from "./getAllInstaLeads.js";
export default async function generateInstaLeadMessage(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const leads = allLeads;
    let successfull_leads: string[] = [];

    const { currentLeads } = await getAllInstaLeads("schedlit");

    const new_leads = leads.filter(
      (lead) => !currentLeads.includes(lead.username)
    );
    console.log(new_leads.length, "out of", leads.length);

    for (const lead of new_leads) {
      const hookUrl = `https://hook.eu2.make.com/zex3wnfsj8xlgousuhr3zfdlvgi53k6q`;
      const payload = {
        username: lead.username,
        fullName: lead.fullName,
        biography: lead.biography,
      };
      const response = await axios.post(hookUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status != 200) {
        throw new Error(`Failed to generate message for ${lead.fullName}`);
      }
      successfull_leads.push(lead.username);
    }
    await updateInstagramLeads(successfull_leads);
    return {
      success: true,
      message: `Generated ${successfull_leads.length} out of ${new_leads.length} messages`,
    };
  } catch (error) {
    console.error("Error Generating Messages:", error);
    return {
      success: false,
      message: `Error generating messages`,
    };
  }
}

const allLeads: {
  username: string;
  fullName: string;
  biography: string;
}[] = [
  {
    username: "umhlangadental",
    fullName: "Umhlanga Dental",
    biography:
      "Dr David Sykes provides quality trustworthy dental care in his modern practice which is fully equipped to the highest standard.",
  },
  {
    username: "signaturesmiles_dentalcentre",
    fullName: "Signatures Smiles",
    biography:
      "Healthy Smiles Everyday\n📞+254757-914-088/0734-97-20-03\nNextgen Mall | Msa Road | 1st Floor | Suite 38 | \nhttps://g.page/r/CV3tYkit3SPDEB0/review",
  },
  {
    username: "enamelelegance_ke",
    fullName: "Enamel Elegance",
    biography:
      "Your Home of Excellent Dentistry. Committed to Providing The Dental Service That You Deserve",
  },
  {
    username: "kriatsmiles",
    fullName: "DENTAL CLINIC IN IBADAN",
    biography:
      "🦷General Dental Services\n🦷 Home Services\n🦷 Oral Health Campaign & Volunteer Services\nChat With Us ⬇️",
  },
  {
    username: "affinaxdentalcare",
    fullName: "Affinax Dental Care",
    biography:
      "Located at Mwalimu Sacco Building\nTom Mboya street \n7th floor, room 708",
  },
  {
    username: "royaldentalclinickenya",
    fullName: "Royal Dental Clinic kenya",
    biography:
      "Dental service provider\nKisumu | Homabay | Migori\n+254 787 181 835",
  },
  {
    username: "eandgdental",
    fullName: "E & G Dental🦷",
    biography: "General and Cosmetic Dentist\nPretoria, Grootfontein",
  },
  {
    username: "irisdental",
    fullName: "Iris Dental Clinic",
    biography:
      "𝘈 𝘸𝘦𝘭𝘭 𝘦𝘲𝘶𝘪𝘱𝘱𝘦𝘥 𝘥𝘦𝘯𝘵𝘢𝘭 𝘤𝘭𝘪𝘯𝘪𝘤 𝘵𝘩𝘢𝘵 𝘰𝘧𝘧𝘦𝘳𝘴 𝘲𝘶𝘢𝘭𝘪𝘵𝘺&𝘢𝘧𝘧𝘰𝘳𝘥𝘢𝘣𝘭𝘦 𝘥𝘦𝘯𝘵𝘢𝘭 𝘵𝘳𝘦𝘢𝘵𝘮𝘦𝘯𝘵 𝘧𝘰𝘳 𝘵𝘩𝘦 𝘸𝘩𝘰𝘭𝘦 𝘧𝘢𝘮𝘪𝘭𝘺\n~𝘐𝘯𝘴𝘶𝘳𝘢𝘯𝘤𝘦 𝘤𝘢𝘳𝘥𝘴 𝘢𝘤𝘤𝘦𝘱𝘵𝘦𝘥~\n𝘐𝘮𝘢𝘢𝘳𝘢 𝘉𝘳𝘢𝘯𝘤𝘩 0733300862",
  },
  {
    username: "smile_suite_dental",
    fullName: "The Smile Suite Dental Centre",
    biography:
      "🦷 Specialised Dental Care\n📍 Mega Mall (QUICKMART), 4th Floor \n      Kakamega\n📞 0715929999 or 0732897490\n📧 thesmilesuite.ke@gmail.com",
  },
  {
    username: "sinai_dental",
    fullName: "SINAI DENTAL",
    biography:
      "Dental practice offering routine family oral care, orthodontics: traditional and clear aligners,  implant work and Cosmetic dentistry",
  },
  {
    username: "sakardental",
    fullName: "Sakar Dental",
    biography:
      "40 años ofreciendo excelencia dental con profesionales formados a nivel internacional para crear las más bellas y naturales sonrisas.",
  },
  {
    username: "ivydental",
    fullName: "IVY DENTAL SERVICES",
    biography:
      "Orthodontics \nConservative Dentistry\nTeeth Whitening\nOral and Maxillofacial Surgery \nChild Dental Health\nChat with us 👇",
  },
  {
    username: "thedentalroom.ct",
    fullName: "The Dental Room",
    biography:
      "Family Practice. Cosmetic Dentistry. Teeth Whitening. Implants. Onsite Laboratory \ninfo@thedentalroom.co.za\nBellville  021 9140903\nParow  021 9396780",
  },
  {
    username: "molepodentalclinic",
    fullName: "Molepo Dental Clinic",
    biography:
      "Oral Health(Dentist)\nRotten Teeth | Bad Breath | Brown Teeth | Bleeding and Swollen Gum|Problems | Painful Teeth | Crowded Teeth | Missing /Lost Teeth",
  },
  {
    username: "mohapidental",
    fullName: "Mohapi Dental",
    biography: "Contact us : 010 023 2858 or info@mohapidental.co.za",
  },
  {
    username: "stocktoncreativedental",
    fullName: "Stockton Creative Dental",
    biography:
      "We are currently taking new patients of all ages, we accept Medi-Cal/Denti-Cal/ and most insurances.",
  },
  {
    username: "dermangeldental",
    fullName: "Dermangel dental",
    biography:
      "https://m.facebook.com › ... › Dentist\nWeb results\nDermangel dental centre - Home | Facebook",
  },
  {
    username: "zmgambushedental",
    fullName: "Z M Gambushe Dental",
    biography: "",
  },
  {
    username: "camberwellchildrensdentistry",
    fullName: "Camberwell Children’s 🦷🦷",
    biography:
      "Specialist Paediatric Dentists                                      📌430 Riversdale Rd, Hawthorn East, Victoria 3123\n📞03) 9882 2666",
  },
  {
    username: "nairobidental1",
    fullName: "Nairobidental",
    biography:
      "Nairobi Dental Care  👨‍⚕️\nWe are located in South C, Nairobi. We offer diagnosis, treatment and conditions of the oral cavity\nCall us on📲 0737856674",
  },
  {
    username: "coates_dental",
    fullName: "Coates Dental",
    biography:
      "We are located in the heart of Wagga Wagga and can cater for all your dental needs and offer a professional and affordable service 🦷",
  },
  {
    username: "nomad_dental_nairobi",
    fullName: "Nomad Dental Nairobi",
    biography:
      "Our services; Dental Bridges, implants, crowning, teeth whitening, filling, root canals, and Braces",
  },
  {
    username: "pashadental001",
    fullName: "Pasha Dental Surgery",
    biography: "Professional Dentistry",
  },
  {
    username: "peakdentalclinic_kisii",
    fullName: "Dr. Emily Mutui",
    biography:
      "Peak Dental Clinic are experts in \n #rootcanaltreatment #toothfilling #teethcleaning  #teethwhitening #milkteethextraction \nWe offer #dentalclinic",
  },
  {
    username: "kloofvillagedental",
    fullName: "Sean N. Napier",
    biography: "Excellence is the only care.",
  },
  {
    username: "national.landingsmiles",
    fullName: "National Landing Smiles",
    biography:
      "Alexandria’s Trusted Dentists! 🤩\n📞(703) 706-9564\nSchedule your next appointment with us! 👇🏽",
  },
  {
    username: "drsdewetdanka",
    fullName: "Dr's De Wet & Danka",
    biography:
      "🦷Dental and Oral Hygiene Practice Bedfordview \n🦷Open 6 days a week\n☎️ 011 616 5115 \n📱 063 8908620",
  },
  {
    username: "jemiasi_dental",
    fullName: "Jemi Asi Dental Clinic",
    biography:
      "A state of the art dental clinic located at 29, Segun Alaka street, Oko-filling bus-stop, Igando, Lagos\nCall 08139969935 to book an appointment today",
  },
  {
    username: "ghandentalclinicsabuja",
    fullName: "Dental clinic - Family dentistry - Oral health",
    biography: "A Dental Clinic Protecting Oral Health and Saving lives",
  },
  {
    username: "smartplusdentalclinic",
    fullName: "Smartplus_dentalclinic",
    biography: "02-294-4854",
  },
  {
    username: "tajidentalclinic",
    fullName: "Taji Dental Clinic",
    biography:
      "Perfect smile! Perfect you!\nOur location: Elgon Court Apartments Ralph Bunche Rd Nairobi.\nContact us today on 0759 212 482",
  },
  {
    username: "ivorydentalpractice",
    fullName: "Invisalign-Composite-Veneers",
    biography:
      "⭐️Invisalign\n⭐️Composite Bonding\n⭐️Veneers\n⭐️Cosmetic Dentistry\n📍Leeds\nDM for a free consultation",
  },
  {
    username: "mothersmiledental",
    fullName: "Mothersmile Dental Care",
    biography:
      "Mothersmile dental care is an established family clinic providing general and specialized high quality dental care to infants, children and adults.",
  },
  {
    username: "365mobiledentalclinic",
    fullName: "Dental Clinic",
    biography:
      "We Provide\n🎗Affordable Dental  Services\n🎗Oral Health Tips\n🎗We Sell Oral Hygiene products\n☎+2348134193210For Consultation & Booking",
  },
  {
    username: "jubbastar_dental_orthodontics",
    fullName: "JubbaStar_Dental",
    biography:
      "Provision of Quality Dental services that are cost friendly #braces #orthodontics #endodontics",
  },
  {
    username: "jacobsonfamilydental",
    fullName: "Jacobson Family Dental",
    biography:
      "We've proudly served multi-generational families in the Grand Valley for over 17 years. Join our family today, so we can start taking care of yours!",
  },
  {
    username: "deepwhitedental",
    fullName: "Deep White Dental Clinic",
    biography:
      "Ultramodern Dental clinic. Westside Mall, 2nd flr, Kenyatta Av, Wesr Rd, Nakuru, Kenya. \ntel:+254 774 993 933",
  },
  {
    username: "qh_specialistdental",
    fullName: "QH SPECIALIST DENTAL CLINIC",
    biography:
      "To provide a quality dental centre with state of the art facilities and also engage in research to advance the course of science and humanity.",
  },
  {
    username: "asman_dental",
    fullName: "Asman Dental | Best Dental Clinic in Lagos Mainland",
    biography:
      "Over 25 Years of Dental Excellence in Lagos.\nServices We offer:\n• Teeth whitening, Braces, Veneers, etc.\n• Regular Checkups.\n• Family dental care.",
  },
  {
    username: "first.choice.dental",
    fullName: "First Choice Dental",
    biography: "☎️ +27 73 413 5791\n📩 firstchoicedr@gmail.com",
  },
  {
    username: "denticare1050",
    fullName: "Denticare Middelburg",
    biography:
      "Welcome to Denticare. We help our patients to maintain healthy and pristine smiles with our restorative procedures and specialised dentistry",
  },
  {
    username: "tysonsmilesva",
    fullName: "Tyson Smile",
    biography:
      "🦷 A healthy & beautiful smile awaits\n💆🏻‍♀️ Spa-like environment to make you feel comfortable\n📞 (571) 758-5889\n👇🏽 Schedule your appointment here!",
  },
  {
    username: "heavenlycrownsdental",
    fullName: "Heavenly Crowns Dental🦷👑",
    biography: "Sorry we are Closed for business  🚫",
  },
  {
    username: "gumsandsmilesdentalclinic",
    fullName: "Gums & Smiles Dental Clinic",
    biography:
      "Your gentle gum & implant specialist\n+254705593603\nLocated at North Park Mall, Eastern Bypass Kamakis Area",
  },
  {
    username: "dr_brighton_",
    fullName: "Kagiso Dental Clinic Palapye",
    biography:
      "Dr. Brighton Bitesigilwe \n👨🏽‍⚕️Restorative and Cosmetic Dentist\n🎓University of Medicine Muhimbili",
  },
  {
    username: "beracahdental",
    fullName: "Beracah Dental",
    biography:
      "Sunninghill Med Centre +2711 803 5739\nBookings: Recomed links available for Drs Sandrine, Michelle & Berneleigh.\n#beracahdental #sunninghilldentists",
  },
  {
    username: "kemlongkidsdental",
    fullName: "Kemlong Kids Dental",
    biography:
      "Providing dental care to diverse populations, especially unprivileged and undeserved children who have no access to this care.",
  },
  {
    username: "bole_dental",
    fullName: "Bole Special Dental clinic",
    biography:
      "𝑮𝒆𝒕 𝒚𝒐𝒖𝒓 𝒐𝒘𝒏 𝒔𝒎𝒊𝒍𝒆 𝒎𝒂𝒌𝒆𝒐𝒗𝒆𝒓 シ︎\nℬℴ𝓁ℯ 𝓂𝒾𝓃𝒾 𝒾𝓃𝒻𝓇ℴ𝓃𝓉 ℴ𝒻 𝓂𝒾𝓁𝓁𝒾𝓃ℯ𝓊𝓂 𝒽𝒶𝓁𝓁\n📞0116180906  \n📲  0966069080\n📧bolespecialdentalclinic@gmail.com\n📬5049",
  },
  {
    username: "terblanchedentistry",
    fullName: "",
    biography: "",
  },
  {
    username: "ivydentalcentre",
    fullName: "Ivy Dental Centre",
    biography: "",
  },
  {
    username: "oasisdentalsurgery",
    fullName: "Dr Zahraa Allana",
    biography:
      "Upmarket dental surgery offering comprehensive dental treatments for all patients.",
  },
  {
    username: "villadentalcare",
    fullName: "Villa Dental Care",
    biography:
      "Villa Dental Care family of smiles, we cater for the whole family's dental needs.\nCall us today on 0758076606 or visit us at freedom heights mall...",
  },
  {
    username: "complete_dentistry",
    fullName: "Complete Dentistry",
    biography:
      "Our aim at Complete Dentistry is to create an environment where you feel comfortable and relaxed.\nBurpengary & Kilcoy clinics",
  },
  {
    username: "acedentalnbi",
    fullName: "Ace Dental Nairobi",
    biography: "High end dental clinic in Westlands, Nairobi",
  },
  {
    username: "dentaldedekind",
    fullName: "Dedekind Dental",
    biography: "General Dentist",
  },
  {
    username: "twohigfamilydentistry",
    fullName: "Twohig Family Dentistry",
    biography:
      "Family Dental Practice in FDL, WI. Click the link below to learn more about the Smiles For Life Campaign for children’s charity starting on March 1st!",
  },
  {
    username: "loftusparkdental",
    fullName: "Loftus Park Dental",
    biography:
      'General & Cosmetic dentist 🦷 \n"A personalized approach to creating the perfect smile."😁\nLoftus Park, Pretoria 🇿🇦 \nCall to book an appointment today!📞',
  },
  {
    username: "apple_dental",
    fullName: "Apple Dental Lane Cove",
    biography:
      "A fresh approach to dentistry\nOPEN Mon-Sat (Late evenings Tues, Wed & Thurs)\nHave a dental question? \nEmail us on the link below",
  },
  {
    username: "rophedental",
    fullName: "Rophe dental clinic",
    biography:
      "Family-friendly, dental clinic. \nGeneral Dentistry \nPaediatric Dentistry \nOrthodontics \nImplant Dentistry \nAesthetic Dentistry",
  },
  {
    username: "walloondentalsurgery",
    fullName: "Walloon Dental",
    biography:
      "At Walloon Dental our main priority is to provide affordable, gentle and quality dentistry to the Walloon and surrounding communities.",
  },
  {
    username: "dentcarehub",
    fullName: "",
    biography: "Dr Jo-Mathew\nBDS(Wits)",
  },
  {
    username: "smile_embassy",
    fullName: "Smile Embassy Dental Clinic | Dentist | Lagos | Best",
    biography:
      "😃 Creating radiant smiles daily!\n🎖The ultimate solution to all your dental worries\n🤝Follow for oral health tips\n👇Book your appointment today!",
  },
  {
    username: "smiledent_dentalcenter",
    fullName: "Smiledent Dental Center",
    biography: "Dentist and dental office",
  },
  {
    username: "lelodent_smiles",
    fullName: "Lelodent Smiles - Dr NE Mbethe",
    biography:
      "📍: Jellico Medical Centre\n📞: 0665057571 | 0645585515\n⏱️: Mon-Fri: 9am-4:30pm | Sat: 9am-1pm\n🚫: Sunday & Public holidays closed",
  },
  {
    username: "dr_tadi_and_partners",
    fullName: "Comfort Dentists",
    biography: "Comfort Dental Care",
  },
  {
    username: "bryanstondental",
    fullName: "Bryanston Dental",
    biography:
      "Bryanston's trusted dental practice. We pride ourselves on a meticulous approach to the functional and aesthetic management of your teeth.",
  },
  {
    username: "bluedownsdental",
    fullName: "Blue Downs Dental",
    biography:
      "Dental studio owned and run by renowned dentist, Dr Bobby Kurien. Based in Blue Downs, Cape Town.",
  },
  {
    username: "dental_clinic_mbeya",
    fullName: "dental clinic mbeya",
    biography: "-Matibabu ya meno \n-Phone 0755041018",
  },
  {
    username: "smilez_dental_surgery",
    fullName: "Smilez_dental_surgery",
    biography:
      "We put a smile on your teeth 😁\nWhat'sApp 0824775495\n@dr_thembeka_buleni",
  },
  {
    username: "elephantdental.thika",
    fullName: "Elephant Dental Thika",
    biography:
      "Mon-Fri 8am to 6pm\nSat-8 am to 4pm\nTo book an appointment call us on  0714999004",
  },
  {
    username: "smilesdental_tanzania",
    fullName: "Smiles Dental Clinic😁",
    biography:
      "Modern dentistry & surgery🦷✨\nAdvanced care for your smile 😁\n📞: 0677051745 | 0716012250\n📍Jamhuri 📍Masaki 📍Posta",
  },
  {
    username: "lindfieldfamilydental",
    fullName: "Lindfield Family Dental",
    biography: "Professional oral health care for your whole family",
  },
  {
    username: "thompson_dental_",
    fullName: "Thompson Dental",
    biography:
      "📍Shop 3A Shoprite Centre, Cnr 8th Ave & Retreat road- Cape Town\n☎️ 💬021 7121091\n🦷 Quality dentistry made affordable\n💚 Consent given for all photos",
  },
  {
    username: "merident_dental",
    fullName: "Merident Dental Health Care",
    biography:
      "A dental health care facility and a centre for supplies of dental equipment located at Gill House, 2nd flr, Room 4c. Cell: 0721 414 746 ,0716 660 470",
  },
  {
    username: "polardental_alfredcove",
    fullName: "Polar Dental Alfred Cove",
    biography:
      "Polar Dental Alfred Cove is a family dental clinic run. #DrAnnaStevens & team will help you maintain a healthy mouth and smile 😀 come in & visit us!",
  },
  {
    username: "easterndental",
    fullName: "The Eastern Dental Practice",
    biography:
      "We are a professional dentistry practice and we are dedicated to offer the best dental services around Kenya.",
  },
  {
    username: "smithdentalbakewell",
    fullName: "Smith Dental Practice",
    biography: "",
  },
  {
    username: "lytteltondental",
    fullName: "Lyttelton Dental",
    biography: "",
  },
  {
    username: "toothworxdentistry_",
    fullName: "Toothworx Dentistry",
    biography:
      "Locations: \n1. Suite 304 Medforum Building, Secunda\n2. Medicross The Berg, Roodepoort Johannesburg",
  },
  {
    username: "spritz_dental",
    fullName: "Spritz Dental Clinic",
    biography: "Top Notch Dental Care #AestheticDentistry #PainFreeDentistry",
  },
  {
    username: "dr.emebetclinic",
    fullName: "Dr Emebet Dental Clinic",
    biography:
      '"A TRADITION OF VALUE, A PROMISE OF EXCELLENCE"\nOfficial page of Dr. Emebet Special Dental Clinic \n🇪🇹',
  },
  {
    username: "3r_dental",
    fullName: "Relief Restore Recover Dental",
    biography:
      "Creating Beautiful Smiles\nContacts: +254726810196\nLocation: Juja, Kenya",
  },
  {
    username: "bestway_dental_services_llc",
    fullName: "Dr.Hector Suazo , DMD",
    biography: "",
  },
  {
    username: "saifeedentalclinickenya",
    fullName: "Saifee Dental Clinic Ltd.",
    biography:
      "Full service Dental clinic. We are specialists in Fluorosis teeth stain removal treatment , No braces Orthodontic treatments. Fixed Implant dentures.",
  },
  {
    username: "glo.bodent_ke",
    fullName: "",
    biography: "",
  },
  {
    username: "stellenbosch_dental",
    fullName: "Stellenbosch Dental",
    biography:
      "Crown & Bridge Dental Laboratory\nSpecializes in Digital Dentistry🦷\nAll-ceramic and porcelain fused to metal crowns and bridges",
  },
  {
    username: "loxodental",
    fullName: "Loxo Dental",
    biography:
      "The experienced team at Loxo Dental is committed to providing you with outstanding dental care that you can trust.",
  },
  {
    username: "butedentalcare",
    fullName: "Bute Dental Care",
    biography:
      "Welcome to the official Instagram of Bute Dental Care.\nThis page is for information purposes only.",
  },
  {
    username: "royaldethiopia_",
    fullName: "Royal Dental Clinic Ethiopia",
    biography:
      "Royal Dental Clinic\nA place where we offer an exceptional and care oriented dental services in Ethiopia.🇪🇹 \nAddress:",
  },
  {
    username: "northumberlanddental",
    fullName: "Northumberland Dental",
    biography:
      "Dental studio owned and run by husband and wife team, Dr Bobby Kurien and Dr Joselyn van Wyk. Based in Parklands, Cape Town.",
  },
  {
    username: "dentalmaxillofacialcentre",
    fullName: "MSDental_MaxillofacialCentre",
    biography:
      "Your neighbourhood dental centre, at suites 24/25 ringback mall, km 36 lekki-epe expressway, mobil filling station Oribanwa",
  },
  {
    username: "glowupdentalcare",
    fullName: "glow up dental care",
    biography:
      "General dental practice\nEmail: glowupdental@yahoo.com\n☎️063 406 2331\nPractice address: 33 circle drive Tzaneen",
  },
  {
    username: "nabdent_dental_center",
    fullName: "Nabdent Dental Center",
    biography:
      "0726393145 We are located along latema road lois plaza 4th flr,all dental services available",
  },
  {
    username: "havendentalclinic",
    fullName: "Haven Dental",
    biography:
      "Implants, fillings, teeth whitening, scaling and polishing, veneers, crowns and bridges,braces",
  },
  {
    username: "sls_dental_care",
    fullName: "St Leonards Square Dental Care",
    biography:
      "At St Leonards Square Dental Care, our mission is to help patients get out of pain and discomfort and ensure we meet their individual needs",
  },
  {
    username: "yarmoskypediatricdentistry",
    fullName: "Yarmosky Pediatric Dentistry",
    biography:
      "Complete Dental and Orthodontic care for infants, children and teens.\nLet us help provide you and your child with the foundation for optimal health! 🦷",
  },
  {
    username: "magnoliadentalroanoke",
    fullName: "Magnolia Dental Roanoke",
    biography: "Award Winning Dentistry From an Award Winning Staff",
  },
  {
    username: "abc_dental_clinic_dsm",
    fullName: "ABC Dental Clinic",
    biography:
      "We're a modern dental clinic in Dar es Salaam with world class service and customer care. At ABC Dental Clinic we vow to bring back your smile",
  },
  {
    username: "ultimatesmiledental",
    fullName: "Ultimatesmiledental",
    biography:
      "Ultimate Smile Dental professional dental physicians driven to provide quality comprehensive oral care. Changing lives - 1 smile at a time!",
  },
  {
    username: "sandtondentalclinic",
    fullName: "Sandton Dental Clinic",
    biography:
      "Sandton Dental Clinic is a modern dental clinic, situated in Sandton City and Triomf by DRS F, A, B Peer",
  },
  {
    username: "dentalonline.co.za",
    fullName: "Dentalonline",
    biography: "",
  },
  {
    username: "edrossdental",
    fullName: "Edross Dental",
    biography: "Family Dentist\n🏠41 Erica Road, Table View, Cape Town",
  },
  {
    username: "dentalhouseltd",
    fullName: "dental house clinic thika",
    biography: "",
  },
  {
    username: "my_dentist_ke",
    fullName: "My Dentist",
    biography:
      "My dentist offers a wide range of preventive,diagnostic service and affordable quality dental treatment all in a relaxed atmosphere.",
  },
  {
    username: "excellentdental",
    fullName: "Access Dental Care",
    biography:
      "Access Dental Care is focused on providing patients with high quality dental treatment and education to maintain oral health.",
  },
  {
    username: "willisdentistry.waynesboro",
    fullName: "Willis & Associates Dentistry",
    biography:
      "We offer personal care, attention, and a one on one relationship with your dentist, while using advanced dental technology and specialized expertise.",
  },
  {
    username: "ccfd___",
    fullName: "Complete Care Family Dentistry",
    biography:
      "Let’s see that smile! 🦷✨\n👩🏽‍⚕️ Dr. Ashalatha Kancharla\n🏆 20(+) years of Gorgeous Dentistry\n😍 We love same-day procedures",
  },
  {
    username: "springsdentalclinic_luanda",
    fullName: "Spring's Dental Clinic Luanda",
    biography:
      "Spring's Dental Clinic is located along Luanda Busia Highway Opposite The Deliverance Church",
  },
  {
    username: "the_flexible_dentist",
    fullName: "Teeth whitening,Teeth cleaning",
    biography:
      "Mobile Dental Clinic\nAdvanced Laser Teeth whitening \nScaling and polishing\nCall / WhatsApp 08071212245",
  },
  {
    username: "sailorsbaydentistry",
    fullName: "Sbd Northbridge",
    biography:
      "https://www.teeth.org.au/teeth/Mouth-and-body-are-connected/For-Patients",
  },
  {
    username: "happy_tooth_dental",
    fullName: "dr faeez ahmed",
    biography:
      "Happy tooth dental adult and kids dentistry in Randfontein\non the main road run by dr Faeez Ahmed. Call 0615106185 to book an appointment",
  },
  {
    username: "tabasamu_dental_clinic_arusha",
    fullName: "D Christian Michael Mariya",
    biography:
      "@tabasamcare\nKusafisha meno, root canal, kurekebisha mpangilio wa meno, kuziba/kutengeneza mwanya, kufunga taya lililovunjika, ushauri bure.",
  },
  {
    username: "tulipafrica",
    fullName: "Tulip Dental Africa",
    biography: "#dental #dentalsupply #whatsapp : +971505235240",
  },
  {
    username: "paediatricdentistryza",
    fullName: "Paediatric Dentistry ZA",
    biography:
      "SAAPD is a non-profit organisation dedicated to promoting the oral health and well-being of the children of South Africa \nRegistration for webinar ⬇️",
  },
  {
    username: "royal_dental_care_1",
    fullName: "Royal Dental Care",
    biography:
      "Royal Dental Care \nHealthy majestic dazzling smiles \nYour No 1 favorite dentist",
  },
  {
    username: "newsquaredental",
    fullName: "New Square Dental Cambridge💚",
    biography:
      "A private dental practice in the heart of Cambridge 🦷\n✨Transforming smiles one magical day at a time✨\nUse the link below to book ⬇️",
  },
  {
    username: "swazilanddentist",
    fullName: "dentist swaziland",
    biography: "Dentist",
  },
  {
    username: "prestige_smile_clinic",
    fullName: "Prestige_Smile_Clinic",
    biography:
      "Dubai/Deira/Al Serkal 2 \ndental ✨\n dermatology ✨\nlaser hair removal✨\n📱056 274 4712\n📱050 331 9881",
  },
  {
    username: "mysouthshoredentalcare",
    fullName: "South Shore Dental Care",
    biography:
      "🦷 Dr. Aaronpaul Singh\n🤩 Let Us Help You Get The Perfect Smile\n✨ Comprehensive Quality Care\n🏆 Recognized 2017 Best Doctors",
  },
  {
    username: "dr.shahinnourozi",
    fullName: "Dr.Shahin Nourozi | Cosmetic | Implant 🦷",
    biography:
      'Over 20 years of dental experience🦷\nCheck out "💎Dr. Nourozi" highlight\nExplore our clients\' transformation column 👇🏻👄\n📞(02) 9665 2391',
  },
  {
    username: "regaldentalabj",
    fullName: "Regal Dental Clinic Int'l |Aesthetic Dentistry|Oral Implants",
    biography:
      "🏨Exclusive Dental Clinic In Abuja\nDr Benn, BDS(Lagos), FPH(Hopkins, USA), Cert. Implantology(UAE)\n☎️📲+2348098201639\nWe create smiles that open doors",
  },
  {
    username: "eastenddentalclinic",
    fullName: "Eastend Dental Clinic Ruiru",
    biography:
      "🦷 Brighten Smiles at Eastend Dental Clinic! 🌟Expert dental care with personalized treatments and 10% OFF your first visit! Book now! 💬 #SmileBright",
  },
  {
    username: "rainbow_dentalclinic",
    fullName: "Rainbow Dental Clinic",
    biography:
      "Dental Implant\nTooth Whitening \nOrthodontic Treatment \nOral Surgery \nDental Hygiene Procedure \nDental Clinic Consultancy\n... We Keep You Smiling",
  },
  {
    username: "smiledentalsolutions_",
    fullName: "Smile Solutions",
    biography: "Dental clinic\n20 years experience",
  },
  {
    username: "westbridgewaterdental",
    fullName: "West Bridgewater Dental",
    biography: "",
  },
  {
    username: "bleeneldentalclinic",
    fullName: "bleen-el dental clinic",
    biography: "",
  },
  {
    username: "complete_carehealthservices",
    fullName: "completecarehealthservices",
    biography:
      "Contact us at: \n+254 769196491\nSERVICES OFFERED: \n~Consultation\n~Ultrasound services\n~ECG and ECHO\n~Physiotherapy services\n~Laboratory services",
  },
  {
    username: "bryanstondentistry",
    fullName: "Dr. J. Desai",
    biography:
      "A healthy smile is a beautiful smile!\nFor:\n🦷 Dental Check-ups\n🦷 Emergency Dentistry\n🦷 Crowns & Bridges \n...and so much more visit our website today.",
  },
  {
    username: "admodentalcenter",
    fullName: "ADMO DENTAL CENTER",
    biography:
      "SPECIALIZED DENTAL CLINIC. Meeting all your dental needs. Contact us at +255 682 905 574.",
  },
  {
    username: "ireayodental",
    fullName: "IreAyo Dental Clinic Ibadan & Abeokuta",
    biography:
      "IreAyo Dental Clinic is a Modern High Quality Affordable Dental Clinic.📌Located in Ibadan(Bodija and Adamasingba) & 📌Abeokuta.",
  },
  {
    username: "beautifulsmiles_dentalclinic",
    fullName: "Beautiful Smiles",
    biography:
      "🥰 Compassionate Care...\n🌈...because we love what we do.\n🌟Every Smile is Beautiful..\n🦚..let's make sure you have the confidence to show it \n033 3421610",
  },
  {
    username: "rivergatedentalcare",
    fullName: "Rivergate Dental Care",
    biography:
      "Rivergate Dental Care\nCall Now! 704-565-0740\nrivergatedentalcarenc.com",
  },
  {
    username: "mphdental",
    fullName: "MPH Dental Surgery",
    biography:
      "Dr Tasneem Mahomed\n70 Republic Road Blairgowrie Randburg \nMphdentalsurgery@gmail.com\n061 531 3424 \n061 541 9469 \n011 781 9236\nWhatsApp 083 257 5301",
  },
  {
    username: "elitedentalclinictz",
    fullName: "Elite Dental Clinic",
    biography:
      "▪️Dental Implants, Clear Aligners, Teeth Whitening, Veneers, Oral surgery, Hygiene, Fillings, Root Canals\n▪️Mon-Fri 8:30-5pm, Sat 8:30-1pm\n🇹🇿",
  },
  {
    username: "enslin_dental_studio",
    fullName: "Dr HG Enslin",
    biography: "Cosmetic and aesthetic dentistry",
  },
  {
    username: "dennehofdentists",
    fullName: "Dennehof Dentistry",
    biography:
      "Dr M. Bassier & Dr A. Sedick\ncall 021 534 0830 or whatsapp 081 2527 358\nSuite 14, Dennehof Centre, Sipres Ave. Thornton\nOPEN during LOCKDOWN Level 1",
  },
  {
    username: "bellevuedentalclinic",
    fullName: "Bellevue Dental Clinic Abuja",
    biography:
      "🏆🏅 | Rated 5 ⭐️⭐️⭐️⭐️⭐️\n🏡🦷 | Premium Dental Care for Adults & Kids \n😁✨ | Over 5,000+ Smiles & Counting... \n📱🗓️ | DM “Dental” or Book Now.",
  },
  {
    username: "revodentalclinics",
    fullName: "REVO Dental",
    biography: "Rethinking oral health.",
  },
  {
    username: "silversmile_dentist",
    fullName: "Silversmile Dental | Braces | Teeth whitening| Replacement",
    biography:
      "we are Specialist in Cosmetic Dentistry at affordable rates\n📌 Afya Centre,Tom Mboya Street, Nairobi \n📞 0797771053\nClick 👇👇👇 to Book appointment.",
  },
  {
    username: "aquagem_dental",
    fullName: "Aquagem Dental Clinic Ltd",
    biography:
      "A state of the art dental clinic located at the heart of Victoria Island central business district, offering top notch dental services.",
  },
  {
    username: "ashfieldfamilydental",
    fullName: "Ashfield Family Dental",
    biography:
      "Your #1 Local & Trusted Family Dentist in the Inner West 🌟\n🔹 Cosmetic Dentistry\n🔹 Dental Implants & Dentures\n🔹 Invisalign & Braces\nContact Us Now! 👇",
  },
  {
    username: "cathedral_dental_clinic",
    fullName: "Cathedral Dental Clinic",
    biography:
      "We are seasoned professional dentists set out to provide you with the best dental care you deserve.\nVisit us today and you will be proud you did.",
  },
  {
    username: "vincentiadental",
    fullName: "Vincentia Dental",
    biography:
      "Dentists providing all general dental, orthodontics, clear aligners (invisible braces), whitening, sleep apnea appliances.",
  },
  {
    username: "meili.dental.care",
    fullName: "Meili Dental Care",
    biography: "Meili Dental Care ... Creating Beautiful Smiles",
  },
  {
    username: "smilefairy_dental",
    fullName: "Smile Fairy_Dental Care",
    biography:
      "@mochichi_health_complex🇿🇦\nSmilefairydentist@gmail.com\n☎️0720220209/0127027022\nCLICK BELOW FOR WHATSAPP👇🏽👇🏽",
  },
  {
    username: "ever.dental",
    fullName: "",
    biography: "",
  },
  {
    username: "_angelsmiles",
    fullName: "Angel smiles dental surgery",
    biography:
      "📍39 General Louis Botha Erasmus St Bronkhorstspruit\n 📞013 932 0203\n 📍Suite 40 Standard Bank Centre Pretoria\n 📞012 326 7168 \n📤angelam@polka.co.za",
  },
  {
    username: "yaya_dental_clinic",
    fullName: "Yaya Dental Clinic",
    biography:
      "🦷 Yaya Dental is a Premier Dental Clinic located in Kilimani area of Nairobi. 🦷\nFor all Your Dental Enquiries, Call or WhatsApp us on \n0723 934 728",
  },
  {
    username: "aandndental",
    fullName: "A&N Dental Center",
    biography: "",
  },
  {
    username: "alfredcovedentalclinic",
    fullName: "ALFRED COVE DENTAL",
    biography: "(08) 9330 4511 \nUnit 5/595 Canning Hwy, Alfred Cove WA 6154",
  },
  {
    username: "edenrisedental",
    fullName: "Eden Rise Dental",
    biography:
      "General dental practice located in Berwick, Vic. Providing a wide range of affordable dental treatments for the whole family.",
  },
  {
    username: "defavours_dental",
    fullName: "DE FAVOURS Dental Clinic",
    biography: "The One Stop Shop For Quality Dental Services.",
  },
  {
    username: "the_resident_dentist",
    fullName: "@DrAtsangu",
    biography:
      "Kenyan dental surgeon located in Nairobi. The Resident Dentist prioritises your satisfaction to ensure you have the best Dental experiences.",
  },
  {
    username: "advanced_denta_centre",
    fullName: "KIGALI SPECIALIZED DENTAL CLINIC 🦷",
    biography: "Rwanda's first dental speciality\nQuality dental care",
  },
  {
    username: "smilespot_dental_clinic",
    fullName: "",
    biography: "‘Old account’ NEW ACCOUNT @smilespot__za",
  },
  {
    username: "newsmile.dental",
    fullName: "Newsmile Family Dentistry",
    biography:
      "At New Smile Family Dentistry, we transform your smile with personalized care! 😁\n🌟 General Dentistry | Braces | Aesthetic Dentistry👨‍⚕️",
  },
  {
    username: "moonlightdentalcentre1",
    fullName: "Moonlight Dental Centre",
    biography: "Your smile is our passion.😁😁🐴",
  },
  {
    username: "dentalangola",
    fullName: "DARE - Dental Angola",
    biography: "#odontologia #dentista #dentistry #angola #saudebucal",
  },
  {
    username: "mercury_dental_clinics",
    fullName: "Mercury dental clinics",
    biography: "ميركوري الرياض 📍\n📍ميركوري المعمورة\n📍ميركوري القاهرة",
  },
  {
    username: "ivorydentalcarekenya",
    fullName: "Ivory Dental Care",
    biography:
      "For all your dental needs.Orthodontist&General Dentist\n#Shareasmile\n📞 +254 786155955\n📧 ivorydental2016@gmail.com\n📍Westlands,Centenary House block B",
  },
  {
    username: "crossroadsdental1",
    fullName: "Crossroads Dental",
    biography:
      "At Crossroads Dental, we strive to provide excellent dental, aesthetic and orthodontic care.",
  },
  {
    username: "dr.smiles_dentalclinicgh",
    fullName: "Dr. Smiles",
    biography:
      "A warm welcome to Dr. Smiles Dental Clinic  🏥  where science meets art and smiles come alive 🦷✨",
  },
  {
    username: "royalcrowndentalcare",
    fullName: "Royalcrowndentalcare",
    biography: "Dental and Implant specialist",
  },
  {
    username: "amanadel_dental_clinic",
    fullName: "AMANADEL DENTAL",
    biography:
      "WE ARE SPECIALISTS  IN PROVIDING TOP NOTCH DENTAL SERVICES.\n👉 ORTHODONTISTS\n👉IMPLANTS\n👉 FILLINGS\n👉 EXTRACTIONS\n👉AND MANY MORE\n📞08035212968,09022449207",
  },
  {
    username: "manamghana",
    fullName: "Manam Ghana Dental House",
    biography: "",
  },
  {
    username: "smilewaysa",
    fullName: "Smileway",
    biography: "Giving you the perfect smile.",
  },
  {
    username: "skyridge_dental",
    fullName: "Skyridge Dental",
    biography:
      "Quality dentistry for the whole family. Gold Coast location. Opening TBA.",
  },
  {
    username: "adeccentertz",
    fullName: "Adec Tanzania",
    biography:
      "Daktari wa Meno\n• Kuziba Meno\n• Kung'oa Meno\n• Kusafisha Meno\n• Meno Bandia\n• Kupanga Meno\n• Kung'arisha Meno",
  },
  {
    username: "drkgadidental",
    fullName: "Brightsmiles",
    biography:
      "🦷 Your Gateway to Radiant Smiles!\n📍Serving the Polokwane community\n💎 We Create Healthy, Confident Grins\n📞 Contact us for Appointments\n+27615197989",
  },
  {
    username: "willis_family_dentistry",
    fullName: "Willis Family Dentistry",
    biography:
      "Willis & Associates Family Dentistry offers a broad range off cosmetic and family dental services to the greater Augusta region.",
  },
  {
    username: "gana.dental.clinic",
    fullName: "Dr. GANA Houssam Eddine",
    biography:
      "🦷Soins dentaires\n🦷Blanchiment\n🦷Prothèses (Fixes et amovibles)\n🦷Chirurgie buccale\n🦷ODF\n📌Route de l'hopital - Sidi Ameur - Bousaada \n📞0662 925 926",
  },
  {
    username: "drbryansher",
    fullName: "Dr Bryan Sher",
    biography:
      "Incorporating the latest in dental technology with our @waterlase_laserdentistry 🦷. Now also doing Botox and Dermal Fillers.",
  },
  {
    username: "mavendentalpioneer",
    fullName: "Maven Dental Pioneer, Mackay",
    biography:
      "Your local #WellnessPeople in Mackay located on Sydney Street! Book your next appointment with one of our dentists at #MavenDental Pioneer Mackay 😄",
  },
  {
    username: "epsommdentalbelmont",
    fullName: "Epsom Dental Care",
    biography:
      "#epsomdentalcare\n📍 5/132 Epsom Avenue in Belmont\n✉  info@epsomdentalcare.com.au\n📞 (08) 9478 2349",
  },
  {
    username: "abbeyviewdental",
    fullName: "",
    biography: "",
  },
  {
    username: "inovadent.clinicadental__",
    fullName: "Inovadent Clinica Dental",
    biography:
      "En InovaDent, le explicaremos de manera sencilla y clara el tratamiento dental mas conveniente a seguir, siempre con la mejor calidad al mejor precio!",
  },
  {
    username: "completesmiledental",
    fullName: "Complete Smile Dental",
    biography:
      "» Your Caring Family Dentist in The Gap Village \n» (07) 3300 3388 \n» Open Monday-Saturday \n» Book Online via the link below ↴",
  },
  {
    username: "micrisdentaldubai",
    fullName: "Micris Dental Clinic",
    biography:
      "We offer a wide range of services to cater to your dental needs.",
  },
  {
    username: "mosman3ddental",
    fullName: "Mosman 3D Dental",
    biography:
      "General and Cosmetic dentist in Mosman area. Providing same day crowns and quality dental care 🦷🪥\nDr Peter Hughes 👨‍⚕️\nDr Nika van Koolwijk 👩🏼‍⚕️",
  },
  {
    username: "eversmiles.ridgetopdental",
    fullName: "EverSmiles - Ridgetop Dental International, Indiranagar",
    biography:
      "Dental partners of Ridgetop Dental International|One of the best dental clinics in Bangalore. \nEmail: info@ridgetopdental.in\nM: 7846889900, 9886047449",
  },
  {
    username: "kendandental",
    fullName: "KEDAN DENTAL CENTRE",
    biography:
      "▫️Routine dentistry\n▫️Root canal\n▫️Full mouth scaling\n▫️Fixed orthodontics/Braces\n▫️Paediatric dentistry\n▫️Extractions\n▫️Crowns \n▫️Disimpactions",
  },
  {
    username: "stream_dental",
    fullName: "Stream dental",
    biography: "",
  },
  {
    username: "highwaydental",
    fullName: "Highway Dental",
    biography: "",
  },
  {
    username: "katemdentalclinic",
    fullName: "KATEM Dental Clinic",
    biography:
      "#Dentiste Dr L.#KATEM\nServices de dentisterie générale : Soins dentaires, Extractions, Détartrage, Prothèses Dentaires fixes & amovibles, Blanchiment",
  },
  {
    username: "andchristiedental",
    fullName: "AndChristie Dental Clinic",
    biography:
      "Smile brighter with us! Your one-stop dental clinic for all your oral health needs. Book an appointment today!",
  },
  {
    username: "noidental",
    fullName: "NOI Dental",
    biography:
      "An affiliate of MedStar Washington Hospital Center. Affordable orthodontic & orofacial care for children, teens and adults.",
  },
  {
    username: "appledentalcarepediatric",
    fullName: "Apple Dental Care",
    biography:
      "Pediatric Dentistry & Orthodontist practice equipped with the latest technology in Chicago (2062 N Milwaukee, 3012 W Fullerton & 7447 W Talcott)",
  },
  {
    username: "smilee_dental",
    fullName: "SMILEE Dental",
    biography:
      "Caring for all your family’s dental needs.  Principal dentist @dr_charles_yongjin_lee",
  },
  {
    username: "orthobridgeorthopedicinstitute",
    fullName: "Orthobridge Institute",
    biography:
      "🦴Bone & Joint Care\n👨‍🔬 Arthroscopy\n🦴Joint care & replacement\n💉PRP\n🥼 PLDD\n 🦴Degenerative joint disease\n🩺Back pain management\n🩺Fracture care\n0701 794697",
  },
  {
    username: "meridentdental",
    fullName: "Merident Dental Health Care",
    biography:
      "A fully equipped Dental clinic with Qualified professionals.\nClinic located at Gill house 2nd flr Room4C",
  },
  {
    username: "drsibuyi_inc",
    fullName: "DR SIBUYI BI INC",
    biography: "",
  },
  {
    username: "klarity_dental",
    fullName: "KLARITY DENTAL 🦷",
    biography:
      "Call/WhatsApp - 09054128700\nWe stay up to light your smile up!💡\nOral Emergencies || Fillings|| Braces|| Tooth Bleaching|| Gold Crowns.",
  },
  {
    username: "pacificdental_ghana",
    fullName: "Pacific Dental Centre Ghana",
    biography: "",
  },
  {
    username: "medikordental",
    fullName: "Medikor Dental Practice",
    biography:
      "An all service, advanced and up to date practice for all your dental needs, prosthetic & cosmetic. #becauseyouareneverfullydressedwithoutasmile😀",
  },
  {
    username: "summitdentalclinicabuja",
    fullName: "Summit Dental Clinic",
    biography:
      "Suite B10, Tswanya Centre, Garki\nNo 3, Santana close, Wuse 2\nSuite 4, Tswanya place, 1st Avenue, Gwarinpa\n09098575704 (Garki) 07044804092 (Wuse 2)",
  },
  {
    username: "the_dentist_uganda",
    fullName: "The Dentist Uganda",
    biography: "",
  },
  {
    username: "donnybrook_dental",
    fullName: "Donnybrook Dental",
    biography:
      "Our goal is to provide our patient with individualised high quality dental care in a friendly comfortable atmosphere.\nContact number: 0370380599",
  },
  {
    username: "sterlingdentalclinickenya",
    fullName: "Sterling Dental",
    biography:
      "Our team has the professional experience to realize that there is no such thing as a one-size-fits-all approach to treatment.",
  },
  {
    username: "tinysmiledentistry",
    fullName: "TinySmile Dentistry",
    biography:
      "🦷: Dentistry for Kids\n🧚🏼‍♀️: @drhelet & Dr Carmi \n📍: Waterkloof, Pretoria \nFollow #dentaltipsbydrhelet for tips on caring for your kids 🦷 \nBookings 👇🏽",
  },
  {
    username: "buruburu_dental_centre",
    fullName: "Buruburu Dental Centre",
    biography:
      "Our services; Dental bridges, implants, crowning, teeth whitening, filling, root canal treatment and braces. Branches in Town, Buruburu & Machakos",
  },
  {
    username: "tzdentalassociation",
    fullName: "Tanzania Dental Association",
    biography:
      "▶️ OUR VISION📌\nTo be a reputable professional organ that is responsive to national, regional and global oral health needs.",
  },
  {
    username: "dentaldocclinic",
    fullName: "DentalDocClinic",
    biography: "Dental Clinic 🦷\n📞 0720484883\n🇰🇪",
  },
  {
    username: "sunnydentalservices",
    fullName: "Sunny Dental Services",
    biography:
      "We are a dental clinic located at 4th floor Kimathi house,  Nairobi. We offer comprehensive and affordable dental services to the public. 0735786825",
  },
  {
    username: "scottsvilledental",
    fullName: "Scottsville Family Dentistry",
    biography:
      "Whether you are here for aesthetic or health reasons, we welcome you to our practice.",
  },
  {
    username: "bec_dental",
    fullName: "Bec Dental",
    biography:
      "Bespoke ✨ Ethical ✨ Caring\nA group of dental practices with a shared goal: to deliver the best results dentistry can provide 🦷",
  },
  {
    username: "catford_dental",
    fullName: "Catford Dental",
    biography:
      "Biomimetic Dentistry\nVeneers in a Day\nTeeth Whitening \nAligners \nBOOK NOW - WhatsApp\nUmhlanga Ridge ☎️  0732202766 \nPhoenix ☎️ 0837764965",
  },
  {
    username: "ezzadentalcare",
    fullName: "EZZA Dental Care",
    biography:
      "Affordable and customised dental care for you and your loved ones...\n Specialized in cosmetic dentistry and pain relief.",
  },
  {
    username: "glassdental",
    fullName: "Glass dental",
    biography:
      "Dentist in Cape Town 🇿🇦\nEmail: veerandental@gmail.com\nTel: 021 418 2977📞(& WhatsApp)\nFor more infor click 👇",
  },
  {
    username: "bullaaledentalclinic",
    fullName: "Somali Dentist",
    biography: "@ridwaan022 @m.qoortaag @bullaaledentalclinic",
  },
  {
    username: "dentalhyjenist",
    fullName: "“Jen” Jodrey RDH, BSDH 🇺🇸",
    biography:
      "Ferris State DHYG Alum 🐶\n📍Dubai, UAE\nchanging the world, one smile at a time 🦷✨",
  },
  {
    username: "ravedental_clinic",
    fullName: "Rave Dental",
    biography:
      "Committed to delivering excellent oral healthcare\n📲 08089213874\n5b College Rd, Yaya Abatan, Ogba, Lagos",
  },
  {
    username: "lakeview_dental_clinic",
    fullName: "Lakeview Dental Clinic",
    biography:
      "Changing the way you smile everyday!                        Call 03 8904 2733 to make your initial appointment now!",
  },
  {
    username: "delightdentalclinicarusha",
    fullName: "DELIGHT DENTAL CLINIC ARUSHA",
    biography:
      "🔥The Dental Experience\n🔥World Class Cosmetic\n🔥 General & Implant \n💯We fix smile\n🙏 Learn more about us",
  },
  {
    username: "dr.teertha_karnakar",
    fullName: "Dr. Teertha Karnakar",
    biography: "Specialist Orthodontist~ Incognito. Invisalign Platinum.",
  },
  {
    username: "cohasset_dental",
    fullName: "Cohasset Dental",
    biography:
      "Our philosophy is to provide treatment to the whole person - with a special focus on how your teeth and gums relate to your total body health.",
  },
  {
    username: "globalsmilessacramento",
    fullName: "Global Smiles Inc. Lilliana Stojic DDS, MAGD, FICOI, LLSR",
    biography:
      "🏥 | Dental Clinic\n😁| Smile Makeovers\n📍| Sacramento, CA\n👇| Book An Appointment",
  },
  {
    username: "drsvanderwalt_linde",
    fullName: "Drs Van der Walt & Linde Inc. and Night Owl Dental",
    biography:
      "Modern dentistry with old-school values. \n🏥 127 Anderson St, Brooklyn, Pretoria East\n☎️ Phone/Whatsapp: 012 362 1306 / 061 526 8528\n⏰ 24/7h",
  },
  {
    username: "highviewdentalclinic",
    fullName: "",
    biography:
      "We are all about teeth!\nFollow back for tips on Oral Health/ Hygiene.\nWe specialize in Restorative and Paediatric Dentristry.\nLocated at APA Arcade",
  },
  {
    username: "lynncreekdental",
    fullName: "Lynn Creek Dental Care",
    biography:
      "Top-rated dentist in Grand Prairie providing you with the best dental care possible!\n📞972-314-2600\nSchedule your next appointment👇🏽",
  },
  {
    username: "dentalfiorentino",
    fullName: "Dental Fiorentino",
    biography: "Odontologia Integral",
  },
  {
    username: "smileredefine",
    fullName: "Smile Redefine Dental clinic",
    biography: "@clickin_myself",
  },
  {
    username: "queens_dental_",
    fullName: "Queens dental services",
    biography:
      "Professional dental services right in your home! \nCall or WhatsApp +234 901 845 4157",
  },
  {
    username: "smyleworxdental",
    fullName: "Smyleworxdental",
    biography:
      "🦷🪥\n📍14 Killarney Terrace Pietermaritzburg \n📞+27 (73) 092-7144 / (033) 342-3596 \n📍2 Bristol House 1A Shongweni Rd Hillcrest \n📞 +27 (61) 526-2289",
  },
  {
    username: "celebrity_dentists",
    fullName: "Family Dentist",
    biography: "Fresh breath and beautiful smile\nWill change your life.",
  },
  {
    username: "healthy_smiledental",
    fullName: "Healthy Smile Dental",
    biography:
      "Our mission at Healthy Smile Dental is to provide the highest standard professional dental services to the community in a friendly and caring way! 😁",
  },
  {
    username: "drjeanvanlierop",
    fullName: "Dr Jean van Lierop",
    biography:
      "Advanced Restorative Dentistry📍 Cape Town 🇿🇦 \n-Co-owner @smithandvanlieropdentistry  @s_a_a_a_d_rsa \n@bridgeprogramza \n@iti_sa\n@opsmilesa",
  },
  {
    username: "afyayakinywanameno",
    fullName: "Daktari wa Meno",
    biography:
      "Dentist at FOBAMA SPECIALIZED POLYCLINIC\nLocated at  new Bagamoyo road Tropical center second floor as International Eye hospital.",
  },
  {
    username: "cleansmiledentalpractice",
    fullName: "Dr Shivani Beharie | BDS |PGDipDent (Endo)",
    biography: "General and Cosmetic Dentist 🦷",
  },
  {
    username: "confidentsmile",
    fullName: "Confident Smile Dentist",
    biography:
      "Family Dentist🦷  🪥 \nCome get your confident smile back😁\nMon-Fri: 8am-5pm \nSat: 8am-12:30pm\nWatz 🆙 0785592194\n📞 012 3200189/0120232600/0124425031",
  },
  {
    username: "totalcaredentalclinic",
    fullName: "Total Care Dental Clinic",
    biography:
      "Total Care Dental Clinic is an Ultra-modern clinic in Port Harcourt. We offer tooth whitening, fillings, crowns, bridges, oral surgery, and much more!",
  },
  {
    username: "mattersdental",
    fullName: "Dental matters",
    biography:
      "General Dentistry\nDental surgery\nCosmetic Dentistry\nOrthodontics\nImplantology\nWe deliver dental treatments to your door step\nCall us on 08036882088",
  },
  {
    username: "ivory_dental_",
    fullName: "IVORY DENTAL",
    biography: "",
  },
  {
    username: "smart_smile_dental_",
    fullName: "Smart Smile Dental Clinic",
    biography: "",
  },
  {
    username: "mobile_dentist",
    fullName: "Dr.Omotayo-Mobile Clinic",
    biography:
      "We make seeing a Dentist very convenient and comfortable by bringing the Dental clinic to your space.\nOnly DMs, 🚫 Calls",
  },
  {
    username: "sbhoratdental",
    fullName: "Dr S Bhorat Dental and Associates",
    biography:
      "#CapeTownDentist\nMelomed Bellville - (021) 948 6350\nMelomed Gatesville - (021) 633 5562\nMelomed Tokai - (021) 712 5781",
  },
  {
    username: "smileplacedental",
    fullName: "Smile Place Dental",
    biography:
      "MELBOURNE: Glen Iris | Forest Hill | Tecoma\nCosmetic, Orthodontic & General Dentistry",
  },
  {
    username: "zoedental2018",
    fullName: "Zoe Dental Clinic",
    biography: "",
  },
  {
    username: "ivorydentalabuja",
    fullName: "Ivory Dental Care Ltd Abuja",
    biography:
      "A beautiful smile that lasts a life time!\nWe offer excellent dental services for the whole family",
  },
  {
    username: "southbroomdental",
    fullName: "Southbroom Dental",
    biography:
      "We are a friendly and helpful Dental Practice🦷situated in Southbroom, KZN. ☎️039 316 6145   📱+27 (60) 936-3191",
  },
  {
    username: "brightondentalcare",
    fullName: "Brighton Dental Care",
    biography:
      "⛱ Brighton’s leading Dental Clinic ⛱\n🦷 General & Cosmetic Dentist 🦷\n🍏 On site Hygienist & Dental Techs 🍏\nAdelaide 📍",
  },
  {
    username: "garrandental",
    fullName: "Garran Dental Woden",
    biography:
      "#GarranDentalWoden\nYour Local Gentle Woden Dentists In Garran  \n🦷 General, Cosmetic & Children’s Dentistry + More\nBook your visit now!",
  },
  {
    username: "dental_connexion",
    fullName: "Dental Connexion",
    biography:
      "Dental Connextion. Passionately creating magnificent smiles. @dentalconnex",
  },
  {
    username: "dr.mc_mathivha_dental",
    fullName: "Dr.mc_mathivha_dental",
    biography: "Passionate and quality driven dentist.",
  },
  {
    username: "neotrestledental",
    fullName: "DENTAL CLINIC IN BONNY ISLAND",
    biography:
      "🦷 PROFESSIONAL TEETHWHITENING \n🦷CROWN/BRIDGES/BRACES/ROOT CANAL THERAPY/FILLINGS/SCALING&POLISHING/THIRDMOLAR SURGERY/GENERAL DENTAL CARE.\n🦷BOOKINGS 👇",
  },
  {
    username: "dovedentalclinic",
    fullName: "Dove Dental Clinic",
    biography:
      "To provide quality and affordable dental care is our mission.\n 📍Zuhura Place, 3rd Floor, Room 301\n📞 0783113673",
  },
  {
    username: "keemzdental",
    fullName: "keemzdubai",
    biography:
      "Dental And Medical Equipment Dealer.  Dental chair | Autoclave | Handpiece |  Scaler | Patient Monitor | Cabinet  📞00971522665717",
  },
  {
    username: "prestigespecialistdentalclinic",
    fullName: "Prestige Specialist Dental Clinics",
    biography: "Creating beautiful smiles for all ages 😃😃",
  },
  {
    username: "dentocdentalclinic",
    fullName: "Dentoc Dental Clinic",
    biography:
      "Exceptional & Comprehensive General and Specialist Dental Care\n🔹️Adjiringanor-0244881961\n🔹️Ashaiman-0551247839\n🔹️Weija-0599394549\n🔹️Sunyani-0256788712",
  },
  {
    username: "appledental",
    fullName: "APPLE DENTAL 🍏",
    biography:
      "We offer a complete range of dental services, delivered in a gentle, affordable manner.\n📧 info@Apple-dental.com.au\n📞3252 2007",
  },
  {
    username: "oakmountdentalcare",
    fullName: "Oakmount Dental Care",
    biography:
      "Private Dental Practice in Chandlers Ford\n* Short term orthodontics\n* Implants\n* Periodontics\n* Teeth Whitening\n* Sedation \n* Hygiene Care",
  },
  {
    username: "microsmiles",
    fullName: "Microsmiles | Premium Dental Care | Chennai | Bangalore",
    biography:
      "🧑‍⚕️Dr.Praveen Rajesh MDS,M Endo RCS(Edin,UK)\n👩‍⚕️Dr.Kirthiga M MDS,PhD(Wellcome trust,UK)\n🥇Clinic of the year-FEDA 2019, IDD 2022",
  },
  {
    username: "drtees._",
    fullName: "Dr Tee’s Dental and Aesthetics",
    biography:
      "Dentist | Glowing skin | Chemical peels | Teeth whitening | dermaplaning | microneedling | Cavitation\nBook an appointment for healthy smiles and skin😁",
  },
  {
    username: "graciousdentalclinic",
    fullName: "Paul Ndungu",
    biography: "Welcome",
  },
  {
    username: "mombasadentalcare",
    fullName: "Mombasa DentalCare",
    biography:
      "Dental clinic\nLikoni mall, 1st floor\nMonday- Saturday 9am-5am \nSundays appointments only",
  },
  {
    username: "dent25414",
    fullName: "Dent~254",
    biography: "",
  },
  {
    username: "skysdentalart",
    fullName: "Skys Dental Art",
    biography:
      "Transform your smile! 🦷✨\n👩🏽‍⚕️Dr. Ashalatha Kancharla\n🏆20(+) years of gorgeous dentistry \n😍 We love same-day procedures",
  },
  {
    username: "focusdentalcentre",
    fullName: "FOCUS DENTAL CENTRE",
    biography:
      "Motto: With focus, everything is possible. \nWE FOCUS ON YOUR HEALTH!",
  },
  {
    username: "cmdental",
    fullName: "CM Dental",
    biography:
      "Family Dental Practice offering quality dentistry at affordable rates.             📞021-555-1987 / 061-793-6225. Montague Gardens, Cape Town",
  },
  {
    username: "hope_dental_clinic_mwanza",
    fullName: "HOPE DENTAL CLINIC MWANZA",
    biography:
      "Kuziba Meno \n:Kusafisha Meno\n:Meno ya Bandia \n:Kunyoosha meno\n:Kung'oa meno\n:Upasuaji \nTupo:Seleman Nassoro-Nyamanoro \n☎️0754887254/0784887254",
  },
  {
    username: "naijadentists",
    fullName: "APDPN",
    biography: "Association of Private Dental Practitioners in Nigeria.",
  },
  {
    username: "oracare_01",
    fullName: "ORACARE DENTAL SERVICES",
    biography:
      "For all your dental enquiries contact :info@oracare.co.za , 0114406444 Lyndhurst Square, 0118820489 Alex mall .",
  },
  {
    username: "absolute_dental",
    fullName: "Absolute Dental",
    biography:
      "A Multi-specialty clinic all about #wetakecareofyoursmile as a lifestyle. Book Your appointment today on 0702340032 / 0101340031 today...",
  },
  {
    username: "couple_dentist",
    fullName: "Couple_dentist",
    biography: "",
  },
  {
    username: "nexusdental.sa",
    fullName: "NEXUS Dental South Africa",
    biography:
      "NEXUS Dental is an exclusive organisation for dentists & dental professionals in SA, providing mentorship, community, & continued education.",
  },
  {
    username: "waynesborodentists",
    fullName: "Willis & Associates Family Dentistry - Waynesboro",
    biography: "Modern Dentistry With an Award-Winning Staff",
  },
  {
    username: "betheldental",
    fullName: "DENTAL CLINIC IN ABUJA",
    biography:
      "We are a group of young, dynamic dental surgeons and therapists who offer services in surgical, restorative, preventive and orthodontic dentistry",
  },
  {
    username: "apexdental_nigeria",
    fullName: "Apex Dental Services",
    biography:
      "YOUR SMILE, OUR PRIORITY\n🏥Suite 214, Jinifa plaza, 1014 Samuel Ademulegun Avenue, Near Grand Square Mall, Central Area Abuja\n☎️092914282 / 08173555551",
  },
  {
    username: "skyline_dentalmaxillofacial",
    fullName: "Skyline Dental Maxillofacial",
    biography: "Committed to Quality and Professional health care",
  },
  {
    username: "cascadedentalnorth",
    fullName: "Robert Walker, DDS",
    biography:
      "Cascade Dental Care is committed to providing top-quality dental services that are comfortable and efficient for North Spokane patients of all ages.",
  },
  {
    username: "baobab.dental",
    fullName: "Baobab Dental Senegal",
    biography: "",
  },
  {
    username: "pdentalclinic",
    fullName: "P Dental Clinic",
    biography:
      "🦷Transforming smiles, one tooth at a time. Your trusted partner in dental care.💙\n📍Carrefour Eto’o Bonamoussadi.\n🕗Open: 8Am - 5Pm",
  },
  {
    username: "prodentalclinicofficial",
    fullName: "Pro Dental Clinic",
    biography:
      "Pro Dental Clinic is a Family Dental practice in Meadowlands Soweto, Attridgeville Pretoria ,Diepsloot , Orange Farm Eyethu Mall & Ebony Park.",
  },
  {
    username: "inline.dental",
    fullName: "Dental Technicians | Cape Town",
    biography:
      "🇿🇦 Specialist Ceramists: Chrome, Crowning, Bridges, Veneers & Dentures \nDigital Smile Design Accredited 🤩\nCAD/CAM facilities 🦷\nAnalog Labratory",
  },
  {
    username: "the_james_clinic",
    fullName: "The James Clinic",
    biography:
      "📍Kilcock - 01 525 3770\n📍Enfield - 046 957 0000\n📍Mullingar - 044 936 2001\n📍Ferbane - 090 645 3864\n.\nWebsite ↙️",
  },
  {
    username: "elephantdentalwaiyaki",
    fullName: "Elephant Dental",
    biography:
      "Elephant Dental clinic is one of best dental health care clinic in Nairobi.We offer comprehensive dental services provided by a highly trained team.",
  },
  {
    username: "aspendentalcentre",
    fullName: "Aspen Dental Centre",
    biography:
      "👨‍👩‍👧‍👧General and Family Dentistry \n🦷Teeth Whitening\n🦷Implants and Prosthetics \n📞: 079 954 4401 / 011 681 6043",
  },
  {
    username: "peakdentalclinickisii",
    fullName: "peak  dental clinic kisii",
    biography: "0716022770",
  },
  {
    username: "elephantdental_nyamira",
    fullName: "ElephantDental Nyamira",
    biography: "Dental clinic",
  },
  {
    username: "beecherdental",
    fullName: "Beecher Dental",
    biography:
      "Family friendly office that is focused on providing the best dental care. Your health is our main priority. \nOnline Booking Available ⬇️",
  },
  {
    username: "fundamental_dental",
    fullName: "Fundamental Dental",
    biography:
      "237 Bryanston Drive , Sandton.\n&\nE-MedCentre , 7 Malibongwe Drive \nRandburg \nTell : 0114636552 \n0678776061 (Whatsapp)",
  },
  {
    username: "dentaire.254",
    fullName: "Dr. Omar A. Omar.",
    biography: "🥼General Dentist.🦷\n🎓BDS (University of Nairobi)📜",
  },
  {
    username: "royalm_dentalclinic",
    fullName: "Royal M dental Clinic",
    biography:
      "Huduma ya Afya  Kinywa na Meno\n🎖Kuweka Meno bandia\n🎖Kunyoosha Meno \n🎖Kuziba Meno\n📞0765303237/0746317497\n🏨 Magomeni Kagera, Amazon College Floor1",
  },
  {
    username: "dentosmilesinfo",
    fullName: "DENTO-SMILES",
    biography: "⚠️🚫CURRENTLY CLOSED💙🦷💚",
  },
  {
    username: "cutesmiledentalclinic",
    fullName: "BEST DENTAL CLINIC IN PORT HARCOURT",
    biography:
      "🦷 BRACES CENTER (Orthodontics)\n🦷 VENEER CENTER (Smile Makeover)\n🦷 DENTAL IMPLANT CENTER\n🦷 FAMILY DENTAL CARE\n🦷 COSMETIC DENTISTRY\n#Braces #Dentistry",
  },
  {
    username: "dentist.mille",
    fullName: "DENTIST MILLE",
    biography: "Let's bring the real smile😊 for everyone",
  },
  {
    username: "paradiseroaddental",
    fullName: "Dentist Newlands, Cape Town 🇿🇦",
    biography:
      "Family, Aesthetic & Airway Dentistry, Myobrace Provider. All your dental needs under one roof 24/7 365 days a year   📞021 686 2200 A/H: 061 7121111",
  },
  {
    username: "omega_dental_clinic",
    fullName: "OMEGA SPECIALIZED DENTAL",
    biography:
      "3rd floor watumishi \nkuziba meno\nkusafisha meno\nmeno bandia \nKuweka vyuma(braces) \n☎️0739 341358 \n📞0713341358 whataap",
  },
  {
    username: "dr_mat_dental",
    fullName: "Dr Thandiwe Noinyane",
    biography:
      "Restorative Dentistry\nCosmetic Dentistry\nPaediatric  Dentistry\n📞(072)2600289 or (061)5858792\nWhatsapp 0722600289\n6632 Sepotokele street, Ikageng",
  },
  {
    username: "great_dental_centre",
    fullName: "Great Dental Centre",
    biography:
      "We are a reputable dental clinic that offers world-class, professional and reliable dental services to people of all ages.",
  },
  {
    username: "muzthedentist",
    fullName: "Dr Muzammil Sadak",
    biography: "Aesthetic Dentistry\nInvisalign Provider",
  },
  {
    username: "zamakhanyadental",
    fullName: "Zamakhanya Dental",
    biography:
      "PRIVATE DENTAL CLINIC \nThe epitome of smiles 🦷\n☎️0681114341\n📍419 mimosa place, Doornpoort, Pretoria",
  },
  {
    username: "smilespot__za",
    fullName: "Smilespot Dental Clinic",
    biography:
      "Potchefstroom: 35 James Moroka st. \nSoshanguve: 735/12 Block VV Soshanguve(opposite Thorntree Plaza) \nFor any enquiries: makgalett@hotmail.com |DM 😇",
  },
  {
    username: "ogadentist",
    fullName: "DENTIST IN LAGOS",
    biography:
      "Dental Clinic in Lagos\nWe help you smile confidently and live happily. \nBook a virtual or physical appointment👇🏾 or just send a DM.♥️",
  },
  {
    username: "beau.dental",
    fullName: "Beau Dental",
    biography: "Creating and maintaining smiles!",
  },
  {
    username: "evabright_dental_practice",
    fullName: "Evabright dental practice",
    biography: "",
  },
  {
    username: "empiredentalclinicdar",
    fullName: "Empire Dental Clinic",
    biography:
      "Committed to Dental Excellence.\nCall for an appointment: \n+255 756 257 321 or +255 788 479 534.",
  },
  {
    username: "oracledentalclinic",
    fullName: "Oracle Dental Ghana",
    biography: "Dental Clinic in Ghana",
  },
  {
    username: "dulce247dental",
    fullName: "DulCe247 Dental Clinic",
    biography:
      "A 24/7 Dental Clinic in the heart of Victoria Island\n+2348136383919",
  },
  {
    username: "mamed_dental_clinic",
    fullName: "mamed dental  clinic",
    biography:
      "Mamed CMP Dental,  Kliniiki Kinywa na Meno na Maabara Meno .\nUshauri Afya Kinywa,\nKusafisha \nKuziba\nKupanga Meno\nMatibabu Mzizi \nKung'oa \n0716311211",
  },
  {
    username: "pretoria_east_dental_care",
    fullName: "Pretoria East Dental Care",
    biography:
      "Book your dental appointment.\nProfessional and friendly service.\nWe accept medical aids. \nEmergency services are available.\nContact Us Today!",
  },
  {
    username: "esnan_dental_turkish_clinic",
    fullName: "ESNAN DENTAL TURKISH CLINIC",
    biography:
      "PHONE : 0782 759749\nJUBILEE And AAR (Assemble)  BRITAM INSURANCE ACCEPTED",
  },
  {
    username: "nomaddental_ke",
    fullName: "Nomad Dental Care",
    biography:
      "Welcome to Nomad Dental Kenya, the home to professional, affordable and quality dental care.\nPlease reach out for inquiries and appointments🤗",
  },
  {
    username: "kenyabeadentist",
    fullName: "Kenyan Dental Students",
    biography:
      "🏆Empowering students to push past limits\n🌍6 Global Dental Journeys rooted in Kenya\n🦷Oral health tips & apl advice\n👄Helping tomorrows Dentists today",
  },
  {
    username: "smartdentalclinic",
    fullName: "SMART SPECIALISED DENTAL",
    biography:
      "🌍Green Acres House\nBagamoyo Road,Opposite Merry water\nVictoria, Dar es salaam \nTEL: 0657 748 070\nNHIF AINA ZOTE,STRATEGIES,JUBILEE,BRITAM INS ACCEPTE",
  },
  {
    username: "the.jaw.physio",
    fullName: "Jaw Pain Migraine Headache Expert",
    biography:
      "Whole health plan, Int. trained Expert\nMigraines/Headaches, Jaw-Neck pain, Ear pain/noise\nDIY courses | Book online-Clinic or Zoom | txt me",
  },
  {
    username: "fairdealdental",
    fullName: "FAIRDEAL DENTAL CARE",
    biography:
      "You can now Call / text / whatsapp  0727771671 to book an appointment or visit our clinic in South B, Laenzi Plaza, 1st Floor, next to Sana Sana Stage",
  },
  {
    username: "dental.health.practice",
    fullName: "Dental Health Practice",
    biography:
      "Dental Health Practice - A friendly, professional practice with a personal approach to your dental needs.",
  },
  {
    username: "ocean.dental.sa",
    fullName: "Ocean Dental",
    biography: "🦷Cosmetic Dentists\n✉️ oceandentalinc@gmail.com",
  },
  {
    username: "collins.street.dental",
    fullName: "Collins Street Dental",
    biography:
      "🔅More to come. Watch this space!🔅\nExperience combined with gentle care. \nProud member of @bec_dental.",
  },
  {
    username: "implantsandbraces.ke",
    fullName: "Implants Braces Ke",
    biography:
      "As distinctive as your smile 😁\nOpen Mon  - Sat: 7:30am - 5:00pm\n☎️ 0745-554625/0719-498878(whatsapp)\n🌐🇰🇪5th flr,wood avenue plaza, kilimani kenya",
  },
  {
    username: "roperbdentalclinic",
    fullName: "Roperb Dental Clinic",
    biography:
      "Creating Healthy, Beautiful Smiles for a Lifetime😁\nWe are your Dental Destination for Unparalleled Care and Stunning Smiles.",
  },
  {
    username: "pristinedentalke",
    fullName: "Pristine Family Dentistry",
    biography: "Dental practice in Nairobi\n#wholefamilysmile\n😄🤓",
  },
  {
    username: "elephantdentalgarden",
    fullName: "Dental_Gardencity",
    biography:
      "Mon - Sat - 8am - 7pm\nSun - 10am - 4pm\nPublic Holidays - 8am - 4pm.\nFor Appointment & Enquiries call/text/whatsApp on - 0703222227 or 0703222228",
  },
  {
    username: "drmulugo_dental",
    fullName: "Dr Mulugo Dental Surgery | Dental Surgery in Polokwane",
    biography:
      "🦷Cosmetic & Family Dentist🦷\n🦷From consulting to Surgery we got you🦷\n📍51 Schoeman street PLK \n📍dikgale medical centre | Marobala ga Dikgale\n📍...",
  },
  {
    username: "kromboomdental",
    fullName: "Kromboom Dental Centre 🦷",
    biography:
      "📍Cape Town 🇿🇦\nMulti-disciplinary Family Dental Practice \nConveniently open till 7pm 🕗\n🆘 After Hours Dental Service\n☎️ 021 696 9428\n🆘 076 617 4756",
  },
  {
    username: "boziddental",
    fullName: "BOZID DENTAL",
    biography:
      "🦷Certified Dental Clinic \n😁Professional Teeth Whitening\n😬Scaling & Polishing\n💎Dental Implant; Teeth Jewelry/Braces\n😉Mon - Sat (8am - 5pm)\nBookings👇",
  },
  {
    username: "the_terrace_dental_centre",
    fullName: "Terrace Dental Centre",
    biography:
      "One of the UK's leading private dentists.\n🦷 Dental Implants\n😁 Invisalign\n🪥 Hygiene Appointments\n📱 0151 355 2474",
  },
  {
    username: "ddhdental",
    fullName: "𝗗𝗗𝗛 𝗗𝗲𝗻𝘁𝗮𝗹 𝗖𝗹𝗶𝗻𝗶𝗰",
    biography:
      "Quality and Affordable dental Care in Nigeria.\nTeeth Whitening | Scaling and polishing\nOrthodontics | Root canal theraphy | Children dentistry",
  },
  {
    username: "drpinarkarataban",
    fullName: "Pınar Karataban 👩🏻‍🔬",
    biography:
      "🎓PhD Çocuk Dişhekimliği/Ortodonti\n👩🏻‍🏫BAU Int.Uni.Öğr.Üyesi     🧘🏻‍♀️Çocuklarda Mindfulness👩🏻‍⚕️@ege.klinik \n☎️ 0546 522 11 03/ 0546 522 11 04",
  },
  {
    username: "veritasdentalclinic",
    fullName: "VERITAS DENTAL CLINIC IBADAN",
    biography:
      "08188436983\n🦷ENDODONTIC SPECIALIST \n🦷VENEERS, CROWNS, BRIDGES\n🦷ORTHODONTIC TREATMENT (DENTAL BRACES)\n🦷DENTAL IMPLANTS\n🦷PAEDIATRIC DENTISTRY",
  },
  {
    username: "stardentalclinics",
    fullName: "STAR DENTAL CLINICS",
    biography:
      "Focusing on exceptional Dental Care\nFamily , paediatric and Cosmetic Dentistry.\nLocation: Alhidaya Heights, 2nd floor 201\nContact:0717123440",
  },
  {
    username: "smilehub_dentalsurgery",
    fullName: "Smile-Hub Dental Surgery",
    biography:
      "Dr Muhammed Essack\nFB:@smilehub_dentalsurgery \nTiktok:@smilehub_dentalsurgery",
  },
  {
    username: "tuskdental",
    fullName: "TUSK DENTAL",
    biography:
      "Dr. Samantha Brenton DDS\nDr. Sheamus Kearns DDS\nGeneral Dentistry Clinic\nOwner Operated\n*Implant\n*Cosmetic\n*Family\n📞506.855.4400\n📬info@tuskdental.ca",
  },
  {
    username: "big_red_tooth_medical",
    fullName: "Big Red Tooth medical centre",
    biography:
      "Medical centre \nVisit our blog! \nhttp://www.bigredtooth.co.za/blog/",
  },
  {
    username: "brighthousedental",
    fullName: "Brighthouse Dental & EyeClinic",
    biography:
      "Dental Implants|Orthodontics\nComprehensive Oral Health Care\n🦷Crowns|Bridges\n🦷Aesthetic Dentistry\n🦷Braces|Teeth whitening",
  },
  {
    username: "24hours_dental_clinic",
    fullName: "24hours Dental Clinic",
    biography:
      "Dental\nImplant clinic 24 hours \nLocation : https://vymaps.com/SD/24-Hrs-Dental-Clinic-32308/\n0922220552@",
  },
  {
    username: "drlvd_dentist",
    fullName: "Dr Linique van Deventer",
    biography:
      "🩺 General dentist \n📍 Doringkloof Mall, Centurion, Gauteng\n✨ Special interest in the fields of child- and aesthetic dentistry. \n📞 +27 (0) 12 667 2550",
  },
  {
    username: "galanadental",
    fullName: "Galana Dental Centre",
    biography: "Creating Miles of Smiles!",
  },
  {
    username: "molarbeardental",
    fullName: "Molar Bear Dental",
    biography:
      "11 Main Road Melville\n011 482 1592\nsmile@molarbeardental.co.za\nhttps://wa.me/message/R7TNS6DSU4VSM1",
  },
  {
    username: "neotrestledentalclinic",
    fullName: "Dr. Tayo BDS, FMCDS",
    biography:
      "🦷Restorative Dentist \n🦷Connecting healthy smiles \n🦷Sister page: @neotrestledental \n🦷Location: Bonny Island \n🦷Book an appointment via WhatsApp 👇",
  },
  {
    username: "reliefrestorerecoverdental",
    fullName: "Relief Restore Recover dental",
    biography:
      "Creating Beautiful Smiles\n~Braces\n~Replacements\n~Dentures\n~Root Canal\n~Scalling & polishing\n☎️+254 726810196 or DM\n📍Juja Professional Center 3rd Flr",
  },
  {
    username: "balmdental",
    fullName: "Balm Dental Care",
    biography:
      "We believe in quality treatment, honest and incredible dental results.\n📍 The Greenhouse Mall, 2nd Floor, Suite 2, Westwing\n📞 0713 071950\n👇 Let's talk.",
  },
  {
    username: "imperialdentalaclinic",
    fullName: "IMPERIAL DENTAL CLINIC",
    biography: "",
  },
  {
    username: "hakka_dental",
    fullName: "Hakka Dental",
    biography: "",
  },
  {
    username: "family_dentistry_nairobi",
    fullName: "Family Dentistry Nairobi",
    biography:
      "Dental Crowns| Veneers| Braces| Teeth Whitening| Oral Surgeries| Dental Implants| Dental Bridges \n😁 Creating Beautiful, Healthy Smiles!\n📞 0707418077",
  },
  {
    username: "tabasamudental",
    fullName: "TabasamuDental",
    biography:
      "𝑌𝑜𝑢𝑟 𝑂𝑛𝑒 𝑆𝑡𝑜𝑝 𝐷𝑒𝑠𝑡𝑖𝑛𝑎𝑡𝑖𝑜𝑛 𝑓𝑜𝑟 𝑌𝑜𝑢𝑟 𝐶𝑜𝑚𝑝𝑟𝑒ℎ𝑒𝑛𝑠𝑖𝑣𝑒 𝐷𝑒𝑛𝑡𝑎𝑙 𝐶𝑎𝑟𝑒\nAmbalal House\n4th Floor, South-wing\nPhone 0740779805 |0783915392\nwww.tabasamudental.co.ke",
  },
  {
    username: "smileculture_dental",
    fullName: "Smile Culture Dental",
    biography:
      "🏅Voted Best Cosmetic Dentist 🥇Invisalign Top 1% Diamond+ Provider \n📍 Fairless Hills |📍 Trevose |📍Huntingdon Valley \n📍 Glen Mills 📍Trooper",
  },
  {
    username: "khanorthodontics_pretoria",
    fullName: "DR MI KHAN SPECIALIST ORTHODONTIST (BDS MDent Orthodontics)🦷",
    biography:
      "Specialist Orthodontist. 18+years experience. Medical Aids Welcome🇿🇦.📞0123746199 📍Suite 1 Savannah Centre, Laudium, Pretoria, South Africa.",
  },
  {
    username: "ismile_dental_center",
    fullName: "iSmile Dental Center",
    biography:
      "Cabinet dentaire spécialisé\nSince 2007\nDr. Meriem HAJJI\n@meriemhajji\n#orthodontic \n#implant\n#estheticdentistry\n#smiledesigner\n#oralsurgery",
  },
  {
    username: "mintdentalke",
    fullName: "Mint Dental Centre",
    biography:
      "Dentist & Dental Office.\nKimathi Street, IPS BUILDING, Wing B, 3rd floor\nCall/whatsapp 0110054466/0735793738",
  },
  {
    username: "montague_dental",
    fullName: "Montague Dental Clinic",
    biography:
      "A modern day dental practice for people of all ages located in the Avenues area in Harare, Zimbabwe. \nHome of beautiful smiles.",
  },
  {
    username: "brightsmile.dental",
    fullName: "brightsmile dental",
    biography: "We practice what we post",
  },
  {
    username: "daydentals",
    fullName: "Day Dental Specialists' Clinic",
    biography:
      "One stop dental clinic located on Lagos Mainland. Call or DM  for appointments. Walk ins are also welcome!#daydentals",
  },
  {
    username: "plazadentals",
    fullName: "PLAZA DENTAL SERVICES",
    biography:
      "🦷 No 1️⃣ Family Dentist in Lagos\n🦷 Fresh Breath Specialist\n🦷 Smile Transformation\n🦷 Holistic Dental Care\nTo book a session, send a Dm or click👇",
  },
  {
    username: "olive_specialist_dental_gh",
    fullName: "Olive Dental Ghana",
    biography:
      "God reigns\nState of the art dental center \nTema Community 25, Near Devtraco Estates\nVisit us and let's give you a dental makeover.\nTel: 0552527004",
  },
  {
    username: "restorationsdental",
    fullName: "Restorations Dental",
    biography:
      "Restorations Dental. \nA Dental clinic offering a variety of services from Tooth replacement, Root Canal Treatment, Braces to Whitening.",
  },
  {
    username: "drtoothsa",
    fullName: "Dr. Tooth | N1 City Dentist",
    biography:
      "CPT\nWe provide high quality care, using the latest technology and techniques to ensure your smile is healthy, beautiful, and confident.\n@drzseedat",
  },
  {
    username: "dentalkenya",
    fullName: "Dental Kenya",
    biography:
      "Do Professional teeth cleaning & whitening at the comfort of your own home for less 👇",
  },
  {
    username: "airedentalclinic",
    fullName: "Aire Dental Clinic",
    biography:
      "YOUR SMILE IS YOUR CONFIDENCE\nTel: 012930850, 012930843\nWhatsApp:08148683011",
  },
  {
    username: "alliance_dental_lab",
    fullName: "#Alliancedental_lab",
    biography:
      "Braces\ncrown and bridge\ncomplete ana partial denture\nall orthodontic treatments\nCall us 0723410027",
  },
  {
    username: "pevedentalclinics",
    fullName: "Peve Dental Clinic",
    biography: "",
  },
  {
    username: "elephant_dental_kikuyu",
    fullName: "Elephant Dental Kikuyu",
    biography:
      "A state of the art dental clinic located in Eureka Towers Kikuyu Town\nCall/whatsapp- 0793601503\nWorking hrs: Monday to Friday 8AM-6PM,Saturday 9AM-3PM",
  },
  {
    username: "supremedentalcentre",
    fullName: "Supreme Dental Centre",
    biography: "Creating Smiles, Changing Lives.",
  },
  {
    username: "pearldentalclinic",
    fullName: "Pearl Dental Clinic Dubai | Your Friendly Dental Clinic",
    biography:
      "🏆 Ranked best dental clinic by Global Clinic Rating\n📍Business Bay, Dubai\n📍Jumeirah 3, Dubai",
  },
  {
    username: "aloe_dental",
    fullName: "Aloe_dental",
    biography:
      "Affordable, Comprehensive Family Dentist💉\nBOOK NOW ☎️ 021 797 2233\nMON-THURS: 9:00-18:00\nFRI: 9:00-12:00\nSAT: 9:00-13:00\n📍Lansdowne, Cape Town",
  },
  {
    username: "pedodent_dentalclinic",
    fullName: "Pedodent Dental Clinic",
    biography: "𝑪𝒓𝒆𝒂𝒕𝒊𝒏𝒈 𝑽𝒊𝒃𝒓𝒂𝒏𝒕 𝑺𝒎𝒊𝒍𝒆𝒔 𝒇𝒐𝒓 𝑯𝒆𝒂𝒍𝒕𝒉𝒚 𝑳𝒊𝒇𝒆𝒔𝒕𝒚𝒍𝒆𝒔",
  },
  {
    username: "truehopedental",
    fullName: "True Hope dental clinic",
    biography: "For treating all dental related problems",
  },
  {
    username: "urban_dental_za",
    fullName: "Urban Dental",
    biography:
      "By Dr Ahmed Makada, Durban, South Africa 031 2085451/6 . +27 (83) 378-7314",
  },
  {
    username: "divinemercydentalcenter",
    fullName: "Divine Mercy Dental Center",
    biography:
      "We make your smile better, that's what we do with passion. #perfectsmile #oralhealth #dentist  #ikorodudentalclinic \n0814-259-8685",
  },
  {
    username: "convenientdentalcareng",
    fullName: "Convenient Dental Care NG",
    biography:
      "Mobile dental healthcare provider dedicated to providing access to quality dental care at and for your convenience; To your doorsteps or via referrals",
  },
  {
    username: "smithandvanlieropdentistry",
    fullName: "Smith & van Lierop Dentistry",
    biography:
      "𝗔𝗗𝗩𝗔𝗡𝗖𝗘𝗗 𝗥𝗘𝗦𝗧𝗢𝗥𝗔𝗧𝗜𝗩𝗘 𝗗𝗘𝗡𝗧𝗜𝗦𝗧𝗥𝗬\nMaking smiles that last. Naturally.\n#slowDENTISTRY\n𝙙𝙚𝙣𝙩𝙞𝙨𝙩𝙧𝙮 𝙡𝙞𝙠𝙚 𝙣𝙖𝙩𝙪𝙧𝙚 𝙞𝙣𝙩𝙚𝙣𝙙𝙚𝙙\n📍Cape Town",
  },
  {
    username: "plattelanddental",
    fullName: "Platteland Dental Aesthetics",
    biography:
      '"Platteland Dental Aesthetics, nestled in the heart of Ermelo, embraces the tranquility of the countryside.',
  },
  {
    username: "kenyan_dental_technologist",
    fullName: "DT",
    biography:
      "Dental tecnologists \nDental crowns,removable teeth (dentures), orthodontic appliances( braises)",
  },
  {
    username: "oralhealthdentistry",
    fullName: "Oral Health Dentistry",
    biography:
      "Address: 438 Oshoek St, Fearie Glen, Pretoria\nContact: 0848639643 (Calls & WhatsApp) \nEmail    : info@oralhealthdentistry.co.za",
  },
  {
    username: "platinumdentalsurgery",
    fullName: "Platinum Dental Surgery",
    biography:
      "Platinum Dental is a #dentalcare center  #dental services in Lagos Nigeria.📞08082228889, 08100880822, whatsapp chat (08033738471, +1(850)-208-3089)",
  },
  {
    username: "ssdentalclinic",
    fullName: "ssdentalclinicltd",
    biography:
      "📞08184662976\nBook your appointment via DM \n4b, Wole olateju Crescent, off admiralty way lekki\nThe Jericho Mall 20 Kudeti Avenue onireke GRA Ibadan.",
  },
];
