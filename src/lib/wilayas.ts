export interface Wilaya {
  code: string;
  name: string;
  nameAr: string;
  communes: Commune[];
}

export interface Commune {
  name: string;
  nameAr: string;
  hasStopDesk: boolean;
}

export const WILAYAS: Wilaya[] = [
  { code: '01', name: 'Adrar', nameAr: 'أدرار', communes: [{ name: 'Adrar', nameAr: 'أدرار', hasStopDesk: true }, { name: 'Reggane', nameAr: 'رقان', hasStopDesk: false }, { name: 'Timimoun', nameAr: 'تيميمون', hasStopDesk: true }] },
  { code: '02', name: 'Chlef', nameAr: 'الشلف', communes: [{ name: 'Chlef', nameAr: 'الشلف', hasStopDesk: true }, { name: 'Ténès', nameAr: 'تنس', hasStopDesk: true }, { name: 'El Karimia', nameAr: 'الكريمية', hasStopDesk: false }] },
  { code: '03', name: 'Laghouat', nameAr: 'الأغواط', communes: [{ name: 'Laghouat', nameAr: 'الأغواط', hasStopDesk: true }, { name: 'Aflou', nameAr: 'أفلو', hasStopDesk: true }] },
  { code: '04', name: 'Oum El Bouaghi', nameAr: 'أم البواقي', communes: [{ name: 'Oum El Bouaghi', nameAr: 'أم البواقي', hasStopDesk: true }, { name: 'Ain Beida', nameAr: 'عين البيضاء', hasStopDesk: true }] },
  { code: '05', name: 'Batna', nameAr: 'باتنة', communes: [{ name: 'Batna', nameAr: 'باتنة', hasStopDesk: true }, { name: 'Barika', nameAr: 'بريكة', hasStopDesk: true }, { name: 'N\'Gaous', nameAr: 'نقاوس', hasStopDesk: false }] },
  { code: '06', name: 'Béjaïa', nameAr: 'بجاية', communes: [{ name: 'Béjaïa', nameAr: 'بجاية', hasStopDesk: true }, { name: 'Akbou', nameAr: 'أقبو', hasStopDesk: true }, { name: 'El Kseur', nameAr: 'القصر', hasStopDesk: true }] },
  { code: '07', name: 'Biskra', nameAr: 'بسكرة', communes: [{ name: 'Biskra', nameAr: 'بسكرة', hasStopDesk: true }, { name: 'Tolga', nameAr: 'طولقة', hasStopDesk: true }] },
  { code: '08', name: 'Béchar', nameAr: 'بشار', communes: [{ name: 'Béchar', nameAr: 'بشار', hasStopDesk: true }] },
  { code: '09', name: 'Blida', nameAr: 'البليدة', communes: [{ name: 'Blida', nameAr: 'البليدة', hasStopDesk: true }, { name: 'Boufarik', nameAr: 'بوفاريك', hasStopDesk: true }, { name: 'Bougara', nameAr: 'بوقرة', hasStopDesk: true }] },
  { code: '10', name: 'Bouira', nameAr: 'البويرة', communes: [{ name: 'Bouira', nameAr: 'البويرة', hasStopDesk: true }, { name: 'Lakhdaria', nameAr: 'الأخضرية', hasStopDesk: true }] },
  { code: '11', name: 'Tamanrasset', nameAr: 'تمنراست', communes: [{ name: 'Tamanrasset', nameAr: 'تمنراست', hasStopDesk: true }] },
  { code: '12', name: 'Tébessa', nameAr: 'تبسة', communes: [{ name: 'Tébessa', nameAr: 'تبسة', hasStopDesk: true }, { name: 'Bir El Ater', nameAr: 'بئر العاتر', hasStopDesk: true }] },
  { code: '13', name: 'Tlemcen', nameAr: 'تلمسان', communes: [{ name: 'Tlemcen', nameAr: 'تلمسان', hasStopDesk: true }, { name: 'Maghnia', nameAr: 'مغنية', hasStopDesk: true }, { name: 'Ghazaouet', nameAr: 'الغزوات', hasStopDesk: false }] },
  { code: '14', name: 'Tiaret', nameAr: 'تيارت', communes: [{ name: 'Tiaret', nameAr: 'تيارت', hasStopDesk: true }, { name: 'Frenda', nameAr: 'فرندة', hasStopDesk: false }] },
  { code: '15', name: 'Tizi Ouzou', nameAr: 'تيزي وزو', communes: [{ name: 'Tizi Ouzou', nameAr: 'تيزي وزو', hasStopDesk: true }, { name: 'Azazga', nameAr: 'عزازقة', hasStopDesk: true }, { name: 'Ain El Hammam', nameAr: 'عين الحمام', hasStopDesk: true }, { name: 'Draa El Mizan', nameAr: 'ذراع الميزان', hasStopDesk: true }] },
  { code: '16', name: 'Alger', nameAr: 'الجزائر', communes: [{ name: 'Alger Centre', nameAr: 'الجزائر الوسطى', hasStopDesk: true }, { name: 'Bab El Oued', nameAr: 'باب الوادي', hasStopDesk: true }, { name: 'Hussein Dey', nameAr: 'حسين داي', hasStopDesk: true }, { name: 'El Harrach', nameAr: 'الحراش', hasStopDesk: true }, { name: 'Bab Ezzouar', nameAr: 'باب الزوار', hasStopDesk: true }, { name: 'Bir Mourad Rais', nameAr: 'بئر مراد رايس', hasStopDesk: true }, { name: 'Cheraga', nameAr: 'الشراقة', hasStopDesk: true }, { name: 'Draria', nameAr: 'الدرارية', hasStopDesk: true }] },
  { code: '17', name: 'Djelfa', nameAr: 'الجلفة', communes: [{ name: 'Djelfa', nameAr: 'الجلفة', hasStopDesk: true }, { name: 'Messaad', nameAr: 'مسعد', hasStopDesk: false }] },
  { code: '18', name: 'Jijel', nameAr: 'جيجل', communes: [{ name: 'Jijel', nameAr: 'جيجل', hasStopDesk: true }, { name: 'El Milia', nameAr: 'الميلية', hasStopDesk: true }, { name: 'Taher', nameAr: 'الطاهير', hasStopDesk: true }] },
  { code: '19', name: 'Sétif', nameAr: 'سطيف', communes: [{ name: 'Sétif', nameAr: 'سطيف', hasStopDesk: true }, { name: 'El Eulma', nameAr: 'العلمة', hasStopDesk: true }, { name: 'Ain Oulmene', nameAr: 'عين ولمان', hasStopDesk: true }, { name: 'Bordj Bou Arreridj', nameAr: 'برج بوعريريج', hasStopDesk: true }] },
  { code: '20', name: 'Saida', nameAr: 'سعيدة', communes: [{ name: 'Saida', nameAr: 'سعيدة', hasStopDesk: true }] },
  { code: '21', name: 'Skikda', nameAr: 'سكيكدة', communes: [{ name: 'Skikda', nameAr: 'سكيكدة', hasStopDesk: true }, { name: 'Collo', nameAr: 'القل', hasStopDesk: true }] },
  { code: '22', name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس', communes: [{ name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس', hasStopDesk: true }] },
  { code: '23', name: 'Annaba', nameAr: 'عنابة', communes: [{ name: 'Annaba', nameAr: 'عنابة', hasStopDesk: true }, { name: 'El Bouni', nameAr: 'البوني', hasStopDesk: true }] },
  { code: '24', name: 'Guelma', nameAr: 'قالمة', communes: [{ name: 'Guelma', nameAr: 'قالمة', hasStopDesk: true }] },
  { code: '25', name: 'Constantine', nameAr: 'قسنطينة', communes: [{ name: 'Constantine', nameAr: 'قسنطينة', hasStopDesk: true }, { name: 'El Khroub', nameAr: 'الخروب', hasStopDesk: true }, { name: 'Ain Smara', nameAr: 'عين سمارة', hasStopDesk: true }] },
  { code: '26', name: 'Médéa', nameAr: 'المدية', communes: [{ name: 'Médéa', nameAr: 'المدية', hasStopDesk: true }, { name: 'Berrouaghia', nameAr: 'البرواقية', hasStopDesk: true }] },
  { code: '27', name: 'Mostaganem', nameAr: 'مستغانم', communes: [{ name: 'Mostaganem', nameAr: 'مستغانم', hasStopDesk: true }] },
  { code: '28', name: 'M\'Sila', nameAr: 'المسيلة', communes: [{ name: 'M\'Sila', nameAr: 'المسيلة', hasStopDesk: true }, { name: 'Bou Saada', nameAr: 'بوسعادة', hasStopDesk: true }] },
  { code: '29', name: 'Mascara', nameAr: 'معسكر', communes: [{ name: 'Mascara', nameAr: 'معسكر', hasStopDesk: true }] },
  { code: '30', name: 'Ouargla', nameAr: 'ورقلة', communes: [{ name: 'Ouargla', nameAr: 'ورقلة', hasStopDesk: true }, { name: 'Hassi Messaoud', nameAr: 'حاسي مسعود', hasStopDesk: true }] },
  { code: '31', name: 'Oran', nameAr: 'وهران', communes: [{ name: 'Oran Centre', nameAr: 'وهران الوسطى', hasStopDesk: true }, { name: 'Es Senia', nameAr: 'السانية', hasStopDesk: true }, { name: 'Bir El Djir', nameAr: 'بئر الجير', hasStopDesk: true }, { name: 'Ain Turk', nameAr: 'عين الترك', hasStopDesk: true }] },
  { code: '32', name: 'El Bayadh', nameAr: 'البيض', communes: [{ name: 'El Bayadh', nameAr: 'البيض', hasStopDesk: true }] },
  { code: '33', name: 'Illizi', nameAr: 'إليزي', communes: [{ name: 'Illizi', nameAr: 'إليزي', hasStopDesk: false }] },
  { code: '34', name: 'Bordj Bou Arreridj', nameAr: 'برج بوعريريج', communes: [{ name: 'Bordj Bou Arreridj', nameAr: 'برج بوعريريج', hasStopDesk: true }] },
  { code: '35', name: 'Boumerdès', nameAr: 'بومرداس', communes: [{ name: 'Boumerdès', nameAr: 'بومرداس', hasStopDesk: true }, { name: 'Bordj Menaiel', nameAr: 'برج منايل', hasStopDesk: true }] },
  { code: '36', name: 'El Tarf', nameAr: 'الطارف', communes: [{ name: 'El Tarf', nameAr: 'الطارف', hasStopDesk: true }] },
  { code: '37', name: 'Tindouf', nameAr: 'تندوف', communes: [{ name: 'Tindouf', nameAr: 'تندوف', hasStopDesk: false }] },
  { code: '38', name: 'Tissemsilt', nameAr: 'تيسمسيلت', communes: [{ name: 'Tissemsilt', nameAr: 'تيسمسيلت', hasStopDesk: true }] },
  { code: '39', name: 'El Oued', nameAr: 'الوادي', communes: [{ name: 'El Oued', nameAr: 'الوادي', hasStopDesk: true }] },
  { code: '40', name: 'Khenchela', nameAr: 'خنشلة', communes: [{ name: 'Khenchela', nameAr: 'خنشلة', hasStopDesk: true }] },
  { code: '41', name: 'Souk Ahras', nameAr: 'سوق أهراس', communes: [{ name: 'Souk Ahras', nameAr: 'سوق أهراس', hasStopDesk: true }] },
  { code: '42', name: 'Tipaza', nameAr: 'تيبازة', communes: [{ name: 'Tipaza', nameAr: 'تيبازة', hasStopDesk: true }, { name: 'Kolea', nameAr: 'القليعة', hasStopDesk: true }] },
  { code: '43', name: 'Mila', nameAr: 'ميلة', communes: [{ name: 'Mila', nameAr: 'ميلة', hasStopDesk: true }] },
  { code: '44', name: 'Ain Defla', nameAr: 'عين الدفلى', communes: [{ name: 'Ain Defla', nameAr: 'عين الدفلى', hasStopDesk: true }, { name: 'Khemis Miliana', nameAr: 'خميس مليانة', hasStopDesk: true }] },
  { code: '45', name: 'Naama', nameAr: 'النعامة', communes: [{ name: 'Naama', nameAr: 'النعامة', hasStopDesk: true }] },
  { code: '46', name: 'Ain Temouchent', nameAr: 'عين تيموشنت', communes: [{ name: 'Ain Temouchent', nameAr: 'عين تيموشنت', hasStopDesk: true }] },
  { code: '47', name: 'Ghardaia', nameAr: 'غرداية', communes: [{ name: 'Ghardaia', nameAr: 'غرداية', hasStopDesk: true }] },
  { code: '48', name: 'Relizane', nameAr: 'غليزان', communes: [{ name: 'Relizane', nameAr: 'غليزان', hasStopDesk: true }] },
  { code: '49', name: 'El M\'Ghair', nameAr: 'المغير', communes: [{ name: 'El M\'Ghair', nameAr: 'المغير', hasStopDesk: false }] },
  { code: '50', name: 'El Meniaa', nameAr: 'المنيعة', communes: [{ name: 'El Meniaa', nameAr: 'المنيعة', hasStopDesk: false }] },
  { code: '51', name: 'Ouled Djellal', nameAr: 'أولاد جلال', communes: [{ name: 'Ouled Djellal', nameAr: 'أولاد جلال', hasStopDesk: false }] },
  { code: '52', name: 'Bordj Badji Mokhtar', nameAr: 'برج باجي مختار', communes: [{ name: 'Bordj Badji Mokhtar', nameAr: 'برج باجي مختار', hasStopDesk: false }] },
  { code: '53', name: 'Béni Abbès', nameAr: 'بني عباس', communes: [{ name: 'Béni Abbès', nameAr: 'بني عباس', hasStopDesk: false }] },
  { code: '54', name: 'Timimoun', nameAr: 'تيميمون', communes: [{ name: 'Timimoun', nameAr: 'تيميمون', hasStopDesk: false }] },
  { code: '55', name: 'Touggourt', nameAr: 'تقرت', communes: [{ name: 'Touggourt', nameAr: 'تقرت', hasStopDesk: true }] },
  { code: '56', name: 'Djanet', nameAr: 'جانت', communes: [{ name: 'Djanet', nameAr: 'جانت', hasStopDesk: false }] },
  { code: '57', name: 'In Salah', nameAr: 'عين صالح', communes: [{ name: 'In Salah', nameAr: 'عين صالح', hasStopDesk: false }] },
  { code: '58', name: 'In Guezzam', nameAr: 'عين قزام', communes: [{ name: 'In Guezzam', nameAr: 'عين قزام', hasStopDesk: false }] },
];

export function getWilayaByCode(code: string): Wilaya | undefined {
  return WILAYAS.find((w) => w.code === code);
}

export function getWilayaByName(name: string): Wilaya | undefined {
  return WILAYAS.find(
    (w) => w.name.toLowerCase() === name.toLowerCase() || w.nameAr === name
  );
}

export function getCommunesByWilaya(wilayaCode: string): Commune[] {
  const wilaya = getWilayaByCode(wilayaCode);
  return wilaya?.communes || [];
}

export function getAllWilayaNames(locale: 'fr' | 'ar' | 'en' = 'fr'): { code: string; name: string }[] {
  return WILAYAS.map((w) => ({
    code: w.code,
    name: locale === 'ar' ? w.nameAr : w.name,
  }));
}
