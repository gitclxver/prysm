/**
 * Comprehensive schools data for Namibia and Eswatini
 * Organized by region with ~10 most popular schools per region
 */

export interface SchoolSeedData {
  name: string;
  country: 'Namibia' | 'South Africa' | 'Eswatini';
  region: string;
  city?: string;
  abbreviations?: string[];
  type: 'highschool' | 'tertiary';
}

export const schoolsData: SchoolSeedData[] = [
  // ========== NAMIBIA - TERTIARY INSTITUTIONS ==========
  { name: 'University of Namibia (UNAM)', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['UNAM', 'University of Namibia'], type: 'tertiary' },
  { name: 'Namibia University of Science and Technology (NUST)', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['NUST', 'Namibia University of Science and Technology', 'University of Science and Technology'], type: 'tertiary' },
  { name: 'International University of Management (IUM)', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['IUM', 'International University of Management'], type: 'tertiary' },
  { name: 'College of the Arts (COTA)', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['COTA', 'College of the Arts'], type: 'tertiary' },
  { name: 'Welwitchia University', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['Welwitchia'], type: 'tertiary' },
  { name: 'Namibian Maritime and Fisheries Institute (NAMFI)', country: 'Namibia', region: 'Erongo', city: 'Walvis Bay', abbreviations: ['NAMFI', 'Maritime and Fisheries Institute'], type: 'tertiary' },
  { name: 'Namibia Command and Staff College', country: 'Namibia', region: 'Otjozondjupa', city: 'Okahandja', abbreviations: ['Command and Staff College'], type: 'tertiary' },

  // ========== NAMIBIA - KHOMAS REGION (Windhoek) ==========
  { name: 'Windhoek High School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['WHS'], type: 'highschool' },
  { name: 'Windhoek International School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['WIS'], type: 'highschool' },
  { name: 'St. Paul\'s College', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['St. Paul\'s'], type: 'highschool' },
  { name: 'Delta Secondary School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['Delta'], type: 'highschool' },
  { name: 'Immanuel Shifidi Secondary School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['ISSS'], type: 'highschool' },
  { name: 'Eros School for Girls', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Jan Möhr Secondary School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['JMS'], type: 'highschool' },
  { name: 'Concordia College', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Edugate Academy', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Eros Secondary School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },

  // ========== NAMIBIA - ERONGO REGION ==========
  { name: 'Swakopmund Secondary School', country: 'Namibia', region: 'Erongo', city: 'Swakopmund', abbreviations: ['SSS'], type: 'highschool' },
  { name: 'Deutsche Höhere Privatschule (DHPS)', country: 'Namibia', region: 'Erongo', city: 'Swakopmund', abbreviations: ['DHPS'], type: 'highschool' },
  { name: 'Namib High School', country: 'Namibia', region: 'Erongo', city: 'Swakopmund', type: 'highschool' },
  { name: 'Walvis Bay High School', country: 'Namibia', region: 'Erongo', city: 'Walvis Bay', abbreviations: ['WBHS'], type: 'highschool' },
  { name: 'Duinesig Combined School', country: 'Namibia', region: 'Erongo', city: 'Walvis Bay', type: 'highschool' },
  { name: 'Henties Bay Secondary School', country: 'Namibia', region: 'Erongo', city: 'Henties Bay', type: 'highschool' },
  { name: 'Karibib Private School', country: 'Namibia', region: 'Erongo', city: 'Karibib', type: 'highschool' },
  { name: 'Omaruru Secondary School', country: 'Namibia', region: 'Erongo', city: 'Omaruru', type: 'highschool' },
  { name: 'Usakos Secondary School', country: 'Namibia', region: 'Erongo', city: 'Usakos', type: 'highschool' },
  { name: 'Arandis Secondary School', country: 'Namibia', region: 'Erongo', city: 'Arandis', type: 'highschool' },

  // ========== NAMIBIA - HARDAP REGION ==========
  { name: 'Mariental High School', country: 'Namibia', region: 'Hardap', city: 'Mariental', type: 'highschool' },
  { name: 'Rehoboth High School', country: 'Namibia', region: 'Hardap', city: 'Rehoboth', type: 'highschool' },
  { name: 'Maltahöhe Secondary School', country: 'Namibia', region: 'Hardap', city: 'Maltahöhe', type: 'highschool' },
  { name: 'Gibeon Secondary School', country: 'Namibia', region: 'Hardap', city: 'Gibeon', type: 'highschool' },
  { name: 'Aminuis Secondary School', country: 'Namibia', region: 'Hardap', city: 'Aminuis', type: 'highschool' },
  { name: 'Stampriet Secondary School', country: 'Namibia', region: 'Hardap', city: 'Stampriet', type: 'highschool' },
  { name: 'Kalkrand Secondary School', country: 'Namibia', region: 'Hardap', city: 'Kalkrand', type: 'highschool' },
  { name: 'Gochas Secondary School', country: 'Namibia', region: 'Hardap', city: 'Gochas', type: 'highschool' },
  { name: 'Leonardville Secondary School', country: 'Namibia', region: 'Hardap', city: 'Leonardville', type: 'highschool' },
  { name: 'Arnos Secondary School', country: 'Namibia', region: 'Hardap', city: 'Arnos', type: 'highschool' },

  // ========== NAMIBIA - KARAS REGION ==========
  { name: 'Karasburg High School', country: 'Namibia', region: 'Karas', city: 'Karasburg', type: 'highschool' },
  { name: 'Keetmanshoop Secondary School', country: 'Namibia', region: 'Karas', city: 'Keetmanshoop', type: 'highschool' },
  { name: 'Lüderitz Secondary School', country: 'Namibia', region: 'Karas', city: 'Lüderitz', type: 'highschool' },
  { name: 'Mariental Private School', country: 'Namibia', region: 'Karas', city: 'Mariental', type: 'highschool' },
  { name: 'Bethanie Secondary School', country: 'Namibia', region: 'Karas', city: 'Bethanie', type: 'highschool' },
  { name: 'Oranjemund Secondary School', country: 'Namibia', region: 'Karas', city: 'Oranjemund', type: 'highschool' },
  { name: 'Grunau Secondary School', country: 'Namibia', region: 'Karas', city: 'Grunau', type: 'highschool' },
  { name: 'Aroab Secondary School', country: 'Namibia', region: 'Karas', city: 'Aroab', type: 'highschool' },
  { name: 'Noordoewer Secondary School', country: 'Namibia', region: 'Karas', city: 'Noordoewer', type: 'highschool' },
  { name: 'Rosh Pinah Secondary School', country: 'Namibia', region: 'Karas', city: 'Rosh Pinah', type: 'highschool' },

  // ========== NAMIBIA - KAVANGO EAST REGION ==========
  { name: 'St Boniface College', country: 'Namibia', region: 'Kavango East', city: 'Rundu', abbreviations: ['St. Boniface'], type: 'highschool' },
  { name: 'Rundu Senior Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Rundu', abbreviations: ['RSSS'], type: 'highschool' },
  { name: 'Andara Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Andara', type: 'highschool' },
  { name: 'Bagani Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Bagani', type: 'highschool' },
  { name: 'Divundu Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Divundu', type: 'highschool' },
  { name: 'Ndiyona Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Ndiyona', type: 'highschool' },
  { name: 'Shamungwe Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Shamungwe', type: 'highschool' },
  { name: 'Sikondo Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Sikondo', type: 'highschool' },
  { name: 'Tondoro Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Tondoro', type: 'highschool' },
  { name: 'Mpungu Secondary School', country: 'Namibia', region: 'Kavango East', city: 'Mpungu', type: 'highschool' },

  // ========== NAMIBIA - KAVANGO WEST REGION ==========
  { name: 'Nkurenkuru Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Nkurenkuru', type: 'highschool' },
  { name: 'Mpungu Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Mpungu', type: 'highschool' },
  { name: 'Kapako Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Kapako', type: 'highschool' },
  { name: 'Ncamagoro Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Ncamagoro', type: 'highschool' },
  { name: 'Nkurenkuru Combined School', country: 'Namibia', region: 'Kavango West', city: 'Nkurenkuru', type: 'highschool' },
  { name: 'Tara Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Tara', type: 'highschool' },
  { name: 'Nehale lyaMpingana Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Nehale lyaMpingana', type: 'highschool' },
  { name: 'Ncumcara Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Ncumcara', type: 'highschool' },
  { name: 'Rupara Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Rupara', type: 'highschool' },
  { name: 'Sikosi Secondary School', country: 'Namibia', region: 'Kavango West', city: 'Sikosi', type: 'highschool' },

  // ========== NAMIBIA - KUNENE REGION ==========
  { name: 'Outjo Secondary School', country: 'Namibia', region: 'Kunene', city: 'Outjo', type: 'highschool' },
  { name: 'Khorixas Secondary School', country: 'Namibia', region: 'Kunene', city: 'Khorixas', type: 'highschool' },
  { name: 'Opuwo Secondary School', country: 'Namibia', region: 'Kunene', city: 'Opuwo', type: 'highschool' },
  { name: 'Okakarara Secondary School', country: 'Namibia', region: 'Kunene', city: 'Okakarara', type: 'highschool' },
  { name: 'Etosha Secondary School', country: 'Namibia', region: 'Kunene', city: 'Outjo', type: 'highschool' },
  { name: 'Bergsig Secondary School', country: 'Namibia', region: 'Kunene', city: 'Outjo', type: 'highschool' },
  { name: 'Orumana Secondary School', country: 'Namibia', region: 'Kunene', city: 'Opuwo', type: 'highschool' },
  { name: 'Otjikondo Secondary School', country: 'Namibia', region: 'Kunene', city: 'Otjikondo', type: 'highschool' },
  { name: 'Epupa Secondary School', country: 'Namibia', region: 'Kunene', city: 'Epupa', type: 'highschool' },
  { name: 'Okangwati Secondary School', country: 'Namibia', region: 'Kunene', city: 'Okangwati', type: 'highschool' },

  // ========== NAMIBIA - OHANGWENA REGION ==========
  { name: 'Haimbili Haufiku Senior Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Eenhana', abbreviations: ['HHSSS'], type: 'highschool' },
  { name: 'Eenhana Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Eenhana', type: 'highschool' },
  { name: 'Ongenga Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Ongenga', type: 'highschool' },
  { name: 'Helao Nafidi Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Helao Nafidi', type: 'highschool' },
  { name: 'Omungwelume Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Omungwelume', type: 'highschool' },
  { name: 'Ohangwena Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Ohangwena', type: 'highschool' },
  { name: 'Okatana Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Okatana', type: 'highschool' },
  { name: 'Ondobe Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Ondobe', type: 'highschool' },
  { name: 'Omulunga Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Omulunga', type: 'highschool' },
  { name: 'Okatope Secondary School', country: 'Namibia', region: 'Ohangwena', city: 'Okatope', type: 'highschool' },

  // ========== NAMIBIA - OMAHEKE REGION ==========
  { name: 'Gobabis Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Gobabis', type: 'highschool' },
  { name: 'Epukiro Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Epukiro', type: 'highschool' },
  { name: 'Otjinene Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Otjinene', type: 'highschool' },
  { name: 'Aminuis Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Aminuis', type: 'highschool' },
  { name: 'Leonardville Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Leonardville', type: 'highschool' },
  { name: 'Omitara Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Omitara', type: 'highschool' },
  { name: 'Steinhausen Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Steinhausen', type: 'highschool' },
  { name: 'Tsumkwe Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Tsumkwe', type: 'highschool' },
  { name: 'Talismanus Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Talismanus', type: 'highschool' },
  { name: 'Epukiro Post 3 Secondary School', country: 'Namibia', region: 'Omaheke', city: 'Epukiro', type: 'highschool' },

  // ========== NAMIBIA - OMUSATI REGION ==========
  { name: 'Negumbo Senior Secondary School', country: 'Namibia', region: 'Omusati', city: 'Onaanda', abbreviations: ['Negumbo'], type: 'highschool' },
  { name: 'Outapi Secondary School', country: 'Namibia', region: 'Omusati', city: 'Outapi', type: 'highschool' },
  { name: 'Tsandi Secondary School', country: 'Namibia', region: 'Omusati', city: 'Tsandi', type: 'highschool' },
  { name: 'Okahao Secondary School', country: 'Namibia', region: 'Omusati', city: 'Okahao', type: 'highschool' },
  { name: 'Ongwediva Secondary School', country: 'Namibia', region: 'Omusati', city: 'Ongwediva', type: 'highschool' },
  { name: 'Oshikuku Secondary School', country: 'Namibia', region: 'Omusati', city: 'Oshikuku', type: 'highschool' },
  { name: 'Ombalantu Secondary School', country: 'Namibia', region: 'Omusati', city: 'Ombalantu', type: 'highschool' },
  { name: 'Okalongo Secondary School', country: 'Namibia', region: 'Omusati', city: 'Okalongo', type: 'highschool' },
  { name: 'Onesi Secondary School', country: 'Namibia', region: 'Omusati', city: 'Onesi', type: 'highschool' },
  { name: 'Elim Secondary School', country: 'Namibia', region: 'Omusati', city: 'Elim', type: 'highschool' },

  // ========== NAMIBIA - OSHAANA REGION ==========
  { name: 'Mweshipandeka High School', country: 'Namibia', region: 'Oshana', city: 'Ongwediva', abbreviations: ['MHS'], type: 'highschool' },
  { name: 'Ondangwa Secondary School', country: 'Namibia', region: 'Oshana', city: 'Ondangwa', type: 'highschool' },
  { name: 'Ongwediva Secondary School', country: 'Namibia', region: 'Oshana', city: 'Ongwediva', type: 'highschool' },
  { name: 'Oshakati Secondary School', country: 'Namibia', region: 'Oshana', city: 'Oshakati', type: 'highschool' },
  { name: 'Uukwiyuushona Secondary School', country: 'Namibia', region: 'Oshana', city: 'Ongwediva', type: 'highschool' },
  { name: 'Iitapa Secondary School', country: 'Namibia', region: 'Oshana', city: 'Oshakati', type: 'highschool' },
  { name: 'Eluwa Secondary School', country: 'Namibia', region: 'Oshana', city: 'Ongwediva', type: 'highschool' },
  { name: 'Etosha Secondary School', country: 'Namibia', region: 'Oshana', city: 'Oshakati', type: 'highschool' },
  { name: 'Okandjengedi Secondary School', country: 'Namibia', region: 'Oshana', city: 'Okandjengedi', type: 'highschool' },
  { name: 'Eenhana Combined School', country: 'Namibia', region: 'Oshana', city: 'Oshakati', type: 'highschool' },

  // ========== NAMIBIA - OSHIKOTO REGION ==========
  { name: 'Ekulo Senior Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Omuthiya', abbreviations: ['Ekulo'], type: 'highschool' },
  { name: 'Tsumeb Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Tsumeb', type: 'highschool' },
  { name: 'Omuthiya Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Omuthiya', type: 'highschool' },
  { name: 'Onayena Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Onayena', type: 'highschool' },
  { name: 'Omuthiya Combined School', country: 'Namibia', region: 'Oshikoto', city: 'Omuthiya', type: 'highschool' },
  { name: 'Oniipa Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Oniipa', type: 'highschool' },
  { name: 'Oshigambo High School', country: 'Namibia', region: 'Oshikoto', city: 'Oshigambo', type: 'highschool' },
  { name: 'Olukonda Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Olukonda', type: 'highschool' },
  { name: 'Onamutai Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Onamutai', type: 'highschool' },
  { name: 'Onanke Secondary School', country: 'Namibia', region: 'Oshikoto', city: 'Onanke', type: 'highschool' },

  // ========== NAMIBIA - OTJOZONDJUPA REGION ==========
  { name: 'Otjiwarongo Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Otjiwarongo', type: 'highschool' },
  { name: 'Grootfontein Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Grootfontein', type: 'highschool' },
  { name: 'Okahandja Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Okahandja', type: 'highschool' },
  { name: 'Otavi Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Otavi', type: 'highschool' },
  { name: 'Omatako Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Omatako', type: 'highschool' },
  { name: 'Omatjete Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Omatjete', type: 'highschool' },
  { name: 'Okakarara Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Okakarara', type: 'highschool' },
  { name: 'Grootfontein Private School', country: 'Namibia', region: 'Otjozondjupa', city: 'Grootfontein', type: 'highschool' },
  { name: 'Okamatapati Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Okamatapati', type: 'highschool' },
  { name: 'Waterberg Secondary School', country: 'Namibia', region: 'Otjozondjupa', city: 'Waterberg', type: 'highschool' },

  // ========== NAMIBIA - ZAMBEZI REGION ==========
  { name: 'Caprivi Senior Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Katima Mulilo', abbreviations: ['CSSS'], type: 'highschool' },
  { name: 'Katima Mulilo Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Katima Mulilo', type: 'highschool' },
  { name: 'Sanjo Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Sanjo', type: 'highschool' },
  { name: 'Ngweze Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Ngweze', type: 'highschool' },
  { name: 'Sangwali Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Sangwali', type: 'highschool' },
  { name: 'Sibinda Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Sibinda', type: 'highschool' },
  { name: 'Linyanti Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Linyanti', type: 'highschool' },
  { name: 'Kongola Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Kongola', type: 'highschool' },
  { name: 'Schuckmannsburg Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Schuckmannsburg', type: 'highschool' },
  { name: 'Bukalo Secondary School', country: 'Namibia', region: 'Zambezi', city: 'Bukalo', type: 'highschool' },

  // ========== ESWATINI - TERTIARY INSTITUTIONS ==========
  { name: 'University of Eswatini (UNESWA)', country: 'Eswatini', region: 'Hhohho', city: 'Kwaluseni', abbreviations: ['UNESWA', 'University of Eswatini'], type: 'tertiary' },
  { name: 'Southern Africa Nazarene University (SANU)', country: 'Eswatini', region: 'Manzini', city: 'Manzini', abbreviations: ['SANU', 'Southern Africa Nazarene University'], type: 'tertiary' },
  { name: 'Eswatini College of Technology (ECOT)', country: 'Eswatini', region: 'Manzini', city: 'Matsapha', abbreviations: ['ECOT', 'College of Technology'], type: 'tertiary' },
  { name: 'Limkokwing University of Creative Technology', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', abbreviations: ['Limkokwing', 'LUCT'], type: 'tertiary' },
  { name: 'Eswatini Medical Christian University', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', abbreviations: ['EMCU', 'Medical Christian University'], type: 'tertiary' },
  { name: 'William Pitcher College', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', type: 'tertiary' },
  { name: 'Botho University (Eswatini Campus)', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', abbreviations: ['Botho'], type: 'tertiary' },

  // ========== SOUTH AFRICA - TERTIARY INSTITUTIONS ==========
  { name: 'University of Cape Town (UCT)', country: 'South Africa', region: 'Western Cape', city: 'Cape Town', abbreviations: ['UCT', 'University of Cape Town'], type: 'tertiary' },
  { name: 'University of the Witwatersrand (Wits)', country: 'South Africa', region: 'Gauteng', city: 'Johannesburg', abbreviations: ['Wits', 'Wits University', 'University of the Witwatersrand'], type: 'tertiary' },
  { name: 'Stellenbosch University', country: 'South Africa', region: 'Western Cape', city: 'Stellenbosch', abbreviations: ['Stellenbosch', 'US'], type: 'tertiary' },
  { name: 'University of Pretoria', country: 'South Africa', region: 'Gauteng', city: 'Pretoria', abbreviations: ['UP', 'University of Pretoria'], type: 'tertiary' },
  { name: 'University of Johannesburg (UJ)', country: 'South Africa', region: 'Gauteng', city: 'Johannesburg', abbreviations: ['UJ', 'University of Johannesburg'], type: 'tertiary' },
  { name: 'University of KwaZulu-Natal (UKZN)', country: 'South Africa', region: 'KwaZulu-Natal', city: 'Durban', abbreviations: ['UKZN', 'University of KwaZulu-Natal'], type: 'tertiary' },
  { name: 'Rhodes University', country: 'South Africa', region: 'Eastern Cape', city: 'Grahamstown', abbreviations: ['Rhodes'], type: 'tertiary' },
  { name: 'University of the Free State', country: 'South Africa', region: 'Free State', city: 'Bloemfontein', abbreviations: ['UFS', 'University of the Free State'], type: 'tertiary' },
  { name: 'North-West University', country: 'South Africa', region: 'North West', city: 'Potchefstroom', abbreviations: ['NWU', 'North-West University'], type: 'tertiary' },
  { name: 'University of Limpopo', country: 'South Africa', region: 'Limpopo', city: 'Polokwane', abbreviations: ['UL', 'University of Limpopo'], type: 'tertiary' },
  { name: 'University of Venda', country: 'South Africa', region: 'Limpopo', city: 'Thohoyandou', abbreviations: ['UNIVEN', 'University of Venda'], type: 'tertiary' },
  { name: 'University of Fort Hare', country: 'South Africa', region: 'Eastern Cape', city: 'Alice', abbreviations: ['UFH', 'University of Fort Hare'], type: 'tertiary' },
  { name: 'University of Zululand', country: 'South Africa', region: 'KwaZulu-Natal', city: 'KwaDlangezwa', abbreviations: ['UNIZULU', 'University of Zululand'], type: 'tertiary' },
  { name: 'University of the Western Cape (UWC)', country: 'South Africa', region: 'Western Cape', city: 'Cape Town', abbreviations: ['UWC', 'University of the Western Cape'], type: 'tertiary' },
  { name: 'Nelson Mandela University', country: 'South Africa', region: 'Eastern Cape', city: 'Port Elizabeth', abbreviations: ['NMU', 'Nelson Mandela University'], type: 'tertiary' },
  { name: 'University of Mpumalanga', country: 'South Africa', region: 'Mpumalanga', city: 'Mbombela', abbreviations: ['UMP', 'University of Mpumalanga'], type: 'tertiary' },
  { name: 'Sefako Makgatho Health Sciences University', country: 'South Africa', region: 'Gauteng', city: 'Pretoria', abbreviations: ['SMU', 'Sefako Makgatho'], type: 'tertiary' },
  { name: 'Tshwane University of Technology (TUT)', country: 'South Africa', region: 'Gauteng', city: 'Pretoria', abbreviations: ['TUT', 'Tshwane University of Technology'], type: 'tertiary' },
  { name: 'University of South Africa (UNISA)', country: 'South Africa', region: 'Gauteng', city: 'Pretoria', abbreviations: ['UNISA', 'University of South Africa'], type: 'tertiary' },
  { name: 'Cape Peninsula University of Technology (CPUT)', country: 'South Africa', region: 'Western Cape', city: 'Cape Town', abbreviations: ['CPUT', 'Cape Peninsula University'], type: 'tertiary' },
  { name: 'Durban University of Technology (DUT)', country: 'South Africa', region: 'KwaZulu-Natal', city: 'Durban', abbreviations: ['DUT', 'Durban University of Technology'], type: 'tertiary' },
  { name: 'Vaal University of Technology (VUT)', country: 'South Africa', region: 'Gauteng', city: 'Vanderbijlpark', abbreviations: ['VUT', 'Vaal University of Technology'], type: 'tertiary' },
  { name: 'Central University of Technology (CUT)', country: 'South Africa', region: 'Free State', city: 'Bloemfontein', abbreviations: ['CUT', 'Central University of Technology'], type: 'tertiary' },
  { name: 'Mangosuthu University of Technology (MUT)', country: 'South Africa', region: 'KwaZulu-Natal', city: 'Umlazi', abbreviations: ['MUT', 'Mangosuthu University'], type: 'tertiary' },

  // ========== ESWATINI - HHOHHO REGION ==========
  { name: 'Mbabane High School', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', abbreviations: ['MHS'], type: 'highschool' },
  { name: 'St. Mark\'s High School', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', type: 'highschool' },
  { name: 'Waterford Kamhlaba United World College', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', abbreviations: ['Waterford', 'WK', 'UWC'], type: 'highschool' },
  { name: 'Sifundzani High School', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', type: 'highschool' },
  { name: 'Lobamba National High School', country: 'Eswatini', region: 'Hhohho', city: 'Lobamba', type: 'highschool' },
  { name: 'Matsapha High School', country: 'Eswatini', region: 'Hhohho', city: 'Matsapha', type: 'highschool' },
  { name: 'St. Mary\'s High School', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', type: 'highschool' },
  { name: 'Ngwane Park High School', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', type: 'highschool' },
  { name: 'Bhunya High School', country: 'Eswatini', region: 'Hhohho', city: 'Bhunya', type: 'highschool' },
  { name: 'Siphofaneni High School', country: 'Eswatini', region: 'Hhohho', city: 'Siphofaneni', type: 'highschool' },

  // ========== ESWATINI - LUBOMBO REGION ==========
  { name: 'Siteki High School', country: 'Eswatini', region: 'Lubombo', city: 'Siteki', type: 'highschool' },
  { name: 'Mhlume High School', country: 'Eswatini', region: 'Lubombo', city: 'Mhlume', type: 'highschool' },
  { name: 'Big Bend High School', country: 'Eswatini', region: 'Lubombo', city: 'Big Bend', type: 'highschool' },
  { name: 'Tshaneni High School', country: 'Eswatini', region: 'Lubombo', city: 'Tshaneni', type: 'highschool' },
  { name: 'Maphiveni High School', country: 'Eswatini', region: 'Lubombo', city: 'Maphiveni', type: 'highschool' },
  { name: 'Lomahasha High School', country: 'Eswatini', region: 'Lubombo', city: 'Lomahasha', type: 'highschool' },
  { name: 'Nhlangano High School', country: 'Eswatini', region: 'Lubombo', city: 'Nhlangano', type: 'highschool' },
  { name: 'Simunye High School', country: 'Eswatini', region: 'Lubombo', city: 'Simunye', type: 'highschool' },
  { name: 'Mhlambanyatsi High School', country: 'Eswatini', region: 'Lubombo', city: 'Mhlambanyatsi', type: 'highschool' },
  { name: 'Lavumisa High School', country: 'Eswatini', region: 'Lubombo', city: 'Lavumisa', type: 'highschool' },

  // ========== ESWATINI - MANZINI REGION ==========
  { name: 'Manzini Central High School', country: 'Eswatini', region: 'Manzini', city: 'Manzini', abbreviations: ['MCHS'], type: 'highschool' },
  { name: 'St. Francis High School', country: 'Eswatini', region: 'Manzini', city: 'Manzini', type: 'highschool' },
  { name: 'St. Michael\'s High School', country: 'Eswatini', region: 'Manzini', city: 'Manzini', type: 'highschool' },
  { name: 'Ngwane High School', country: 'Eswatini', region: 'Manzini', city: 'Manzini', type: 'highschool' },
  { name: 'Matsapha High School', country: 'Eswatini', region: 'Manzini', city: 'Matsapha', type: 'highschool' },
  { name: 'Sidvwashini High School', country: 'Eswatini', region: 'Manzini', city: 'Sidvwashini', type: 'highschool' },
  { name: 'Nhlangano High School', country: 'Eswatini', region: 'Manzini', city: 'Nhlangano', type: 'highschool' },
  { name: 'Malkerns High School', country: 'Eswatini', region: 'Manzini', city: 'Malkerns', type: 'highschool' },
  { name: 'Zombodze High School', country: 'Eswatini', region: 'Manzini', city: 'Zombodze', type: 'highschool' },
  { name: 'Luve High School', country: 'Eswatini', region: 'Manzini', city: 'Luve', type: 'highschool' },

  // ========== ESWATINI - SHISELWENI REGION ==========
  { name: 'Nhlangano High School', country: 'Eswatini', region: 'Shiselweni', city: 'Nhlangano', type: 'highschool' },
  { name: 'Hluthi High School', country: 'Eswatini', region: 'Shiselweni', city: 'Hluthi', type: 'highschool' },
  { name: 'Ntfonjeni High School', country: 'Eswatini', region: 'Shiselweni', city: 'Ntfonjeni', type: 'highschool' },
  { name: 'Gege High School', country: 'Eswatini', region: 'Shiselweni', city: 'Gege', type: 'highschool' },
  { name: 'Matsanjeni High School', country: 'Eswatini', region: 'Shiselweni', city: 'Matsanjeni', type: 'highschool' },
  { name: 'Zombodze High School', country: 'Eswatini', region: 'Shiselweni', city: 'Zombodze', type: 'highschool' },
  { name: 'Mahlalini High School', country: 'Eswatini', region: 'Shiselweni', city: 'Mahlalini', type: 'highschool' },
  { name: 'Maseyisini High School', country: 'Eswatini', region: 'Shiselweni', city: 'Maseyisini', type: 'highschool' },
  { name: 'Ngwempisi High School', country: 'Eswatini', region: 'Shiselweni', city: 'Ngwempisi', type: 'highschool' },
  { name: 'Kubuta High School', country: 'Eswatini', region: 'Shiselweni', city: 'Kubuta', type: 'highschool' },
];

