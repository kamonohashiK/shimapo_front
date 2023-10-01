import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "#000",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

export default function SearchBar() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: top100Films,
    getOptionLabel: (option) => option.target,
    //TODO: 選択後に入力フォームに残り文字列をLabelにしたい
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>useAutocomplete</Label>
        <Input {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof top100Films).map((option, index) => (
            <li {...getOptionProps({ option, index })} key={option.uid}>{option.label}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}

// TODO: 変数名変更とデータの外出し
const top100Films = [
    {
      uid: "HKD_RBN_REBUNTO",
      label: "礼文島(北海道礼文町)",
      target: "礼文島 れぶんとう Rebunto 北海道 礼文町",
    },
    {
      uid: "HKD__RISHIRITO",
      label: "利尻島(北海道利尻町・利尻富士町)",
      target: "利尻島 りしりとう Rishirito 北海道 利尻町・利尻富士町",
    },
    {
      uid: "HKD_HBR_YAGISHIRITO",
      label: "焼尻島(北海道羽幌町)",
      target: "焼尻島 やぎしりとう Yagishirito 北海道 羽幌町",
    },
    {
      uid: "HKD_HBR_TEURITO",
      label: "天売島(北海道羽幌町)",
      target: "天売島 てうりとう Teurito 北海道 羽幌町",
    },
    {
      uid: "HKD_OKS_OKUSHIRITO",
      label: "奥尻島(北海道奥尻町)",
      target: "奥尻島 おくしりとう Okushirito 北海道 奥尻町",
    },
    {
      uid: "HKD_ATG_KOJIMA",
      label: "小島(北海道厚岸町)",
      target: "小島 こじま Kojima 北海道 厚岸町",
    },
    {
      uid: "MYG_KSN_OSHIMA",
      label: "大島(宮城県気仙沼市)",
      target: "大島 おおしま Oshima 宮城県 気仙沼市",
    },
    {
      uid: "MYG_ONG_IZUSHIMA",
      label: "出島(宮城県女川町)",
      target: "出島 いずしま Izushima 宮城県 女川町",
    },
    {
      uid: "MYG_ONG_ENOSHIMA",
      label: "江島(宮城県女川町)",
      target: "江島 えのしま Enoshima 宮城県 女川町",
    },
    {
      uid: "MYG_ISM_AJISHIMA",
      label: "網地島(宮城県石巻市)",
      target: "網地島 あじしま Ajishima 宮城県 石巻市",
    },
    {
      uid: "MYG_ISM_TASHIROJIMA",
      label: "田代島(宮城県石巻市)",
      target: "田代島 たしろじま Tashirojima 宮城県 石巻市",
    },
    {
      uid: "MYG_SOG_SABUSAWAJIMA",
      label: "寒風沢島(宮城県塩竈市)",
      target: "寒風沢島 さぶさわじま Sabusawajima 宮城県 塩竈市",
    },
    {
      uid: "MYG_SOG_NONOSHIMA",
      label: "野々島(宮城県塩竈市)",
      target: "野々島 ののしま Nonoshima 宮城県 塩竈市",
    },
    {
      uid: "MYG_SOG_KATSURAIJMA",
      label: "桂島(宮城県塩竈市)",
      target: "桂島 かつらじま Katsuraijma 宮城県 塩竈市",
    },
    {
      uid: "MYG_SOG_HOJIMA",
      label: "朴島(宮城県塩竈市)",
      target: "朴島 ほおじま Hojima 宮城県 塩竈市",
    },
    {
      uid: "MYG_ISM_KINKASAN",
      label: "金華山(宮城県石巻市)",
      target: "金華山 きんかさん Kinkasan 宮城県 石巻市",
    },
    {
      uid: "MYG_HMS_MIYATOJIMA",
      label: "宮戸島(宮城県東松島市)",
      target: "宮戸島 みやとじま Miyatojima 宮城県 東松島市",
    },
    {
      uid: "YMGT_SKT_TOBISHIMA",
      label: "飛島(山形県酒田市)",
      target: "飛島 とびしま Tobishima 山形県 酒田市",
    },
    {
      uid: "TKY_OSM_OSHIMA",
      label: "大島(東京都大島町)",
      target: "大島 おおしま Oshima 東京都 大島町",
    },
    {
      uid: "TKY_TSM_TOSHIMA",
      label: "利島(東京都利島村)",
      target: "利島 としま Toshima 東京都 利島村",
    },
    {
      uid: "TKY_NJM_NIIJIMA",
      label: "新島(東京都新島村)",
      target: "新島 にいじま Niijima 東京都 新島村",
    },
    {
      uid: "TKY_NJM_SHIKINEJIMA",
      label: "式根島(東京都新島村)",
      target: "式根島 しきねじま Shikinejima 東京都 新島村",
    },
    {
      uid: "TKY_KDS_KODUSHIMA",
      label: "神津島(東京都神津島村)",
      target: "神津島 こうづしま Kodushima 東京都 神津島村",
    },
    {
      uid: "TKY_MYK_MIYAKEJIMA",
      label: "三宅島(東京都三宅村)",
      target: "三宅島 みやけじま Miyakejima 東京都 三宅村",
    },
    {
      uid: "TKY_MKR_MIKURASHIMA",
      label: "御蔵島(東京都御蔵島村)",
      target: "御蔵島 みくらしま Mikurashima 東京都 御蔵島村",
    },
    {
      uid: "TKY_HCJ_HACHIJOSHIMA",
      label: "八丈島(東京都八丈町)",
      target: "八丈島 はちじょうしま Hachijoshima 東京都 八丈町",
    },
    {
      uid: "TKY_AOG_AOGASHIMA",
      label: "青ケ島(東京都青ケ島村)",
      target: "青ケ島 あおがしま Aogashima 東京都 青ケ島村",
    },
    {
      uid: "TKY_OGS_CHICHIJIMA",
      label: "父島(東京都小笠原村)",
      target: "父島 ちちじま Chichijima 東京都 小笠原村",
    },
    {
      uid: "TKY_OGS_HAHAJIMA",
      label: "母島(東京都小笠原村)",
      target: "母島 ははじま Hahajima 東京都 小笠原村",
    },
    {
      uid: "TKY_OGS_IOTO",
      label: "硫黄島(東京都小笠原村)",
      target: "硫黄島 いおうとう Ioto 東京都 小笠原村",
    },
    {
      uid: "TKY_OGS_MINAMITORISHIMA",
      label: "南鳥島(東京都小笠原村)",
      target: "南鳥島 みなみとりしま Minamitorishima 東京都 小笠原村",
    },
    {
      uid: "CB_KMG_NIEMONJIMA",
      label: "仁右衛門島(千葉県鴨川市)",
      target: "仁右衛門島 にえもんじま Niemonjima 千葉県 鴨川市",
    },
    {
      uid: "KNG_MUR_JOGASHIMA",
      label: "城ヶ島(神奈川県三浦市)",
      target: "城ヶ島 じょうがしま Jogashima 神奈川県 三浦市",
    },
    {
      uid: "KNG_FJS_ENOSHIMA",
      label: "江の島(神奈川県藤沢市)",
      target: "江の島 えのしま Enoshima 神奈川県 藤沢市",
    },
    {
      uid: "NGT_AWS_AWASHIMA",
      label: "粟島(新潟県粟島浦村)",
      target: "粟島 あわしま Awashima 新潟県 粟島浦村",
    },
    {
      uid: "NGT_SD_SADOGASHIMA",
      label: "佐渡島(新潟県佐渡市)",
      target: "佐渡島 さどがしま Sadogashima 新潟県 佐渡市",
    },
    {
      uid: "ISK_WJM_HEGURAJIMA",
      label: "舳倉島(石川県輪島市)",
      target: "舳倉島 へぐらじま Hegurajima 石川県 輪島市",
    },
    {
      uid: "ISK_NNO_NOTOJIMA",
      label: "能登島(石川県七尾市)",
      target: "能登島 のとじま Notojima 石川県 七尾市",
    },
    {
      uid: "SZO_ATM_HATSUSHIMA",
      label: "初島(静岡県熱海市)",
      target: "初島 はつしま Hatsushima 静岡県 熱海市",
    },
    {
      uid: "AIC_NSO_SAKUSHIMA",
      label: "佐久島(愛知県西尾市)",
      target: "佐久島 さくしま Sakushima 愛知県 西尾市",
    },
    {
      uid: "AIC_MNM_HIMAKAJIMA",
      label: "日間賀島(愛知県南知多町)",
      target: "日間賀島 ひまかじま Himakajima 愛知県 南知多町",
    },
    {
      uid: "AIC_MNM_SHINOJIMA",
      label: "篠島(愛知県南知多町)",
      target: "篠島 しのじま Shinojima 愛知県 南知多町",
    },
    {
      uid: "ME_TB_KAMISHIMA",
      label: "神島(三重県鳥羽市)",
      target: "神島 かみしま Kamishima 三重県 鳥羽市",
    },
    {
      uid: "ME_TB_TOUSHIJIMA",
      label: "答志島(三重県鳥羽市)",
      target: "答志島 とうしじま Toushijima 三重県 鳥羽市",
    },
    {
      uid: "ME_TB_SUGASHIMA",
      label: "菅島(三重県鳥羽市)",
      target: "菅島 すがしま Sugashima 三重県 鳥羽市",
    },
    {
      uid: "ME_TB_SAKATEJIMA",
      label: "坂手島(三重県鳥羽市)",
      target: "坂手島 さかてじま Sakatejima 三重県 鳥羽市",
    },
    {
      uid: "ME_SM_WATAKANOJIMA",
      label: "渡鹿野島(三重県志摩市)",
      target: "渡鹿野島 わたかのじま Watakanojima 三重県 志摩市",
    },
    {
      uid: "ME_SM_MASAKIJIMA",
      label: "間崎島(三重県志摩市)",
      target: "間崎島 まさきじま Masakijima 三重県 志摩市",
    },
    {
      uid: "ME_SM_KASIKOJIMA",
      label: "賢島(三重県志摩市)",
      target: "賢島 かしこじま Kasikojima 三重県 志摩市",
    },
    {
      uid: "ME_SM_YOKOYAMAJIMA",
      label: "横山島(三重県志摩市)",
      target: "横山島 よこやまじま Yokoyamajima 三重県 志摩市",
    },
    {
      uid: "SIG_OUM_OKISHIMA",
      label: "沖島(滋賀県近江八幡市)",
      target: "沖島 おきしま Okishima 滋賀県 近江八幡市",
    },
    {
      uid: "HYG__AWAJISHIMA",
      label: "淡路島(兵庫県淡路市・洲本市・南あわじ市)",
      target: "淡路島 あわじしま Awajishima 兵庫県 淡路市・洲本市・南あわじ市",
    },
    {
      uid: "HYG_MAW_NUSHIMA",
      label: "沼島(兵庫県南あわじ市)",
      target: "沼島 ぬしま Nushima 兵庫県 南あわじ市",
    },
    {
      uid: "HYG_HMJ_IESHIMA",
      label: "家島(兵庫県姫路市)",
      target: "家島 いえしま Ieshima 兵庫県 姫路市",
    },
    {
      uid: "HYG_HMJ_TANGASHIMA",
      label: "男鹿島(兵庫県姫路市)",
      target: "男鹿島 たんがしま Tangashima 兵庫県 姫路市",
    },
    {
      uid: "HYG_HMJ_BOZEJIMA",
      label: "坊勢島(兵庫県姫路市)",
      target: "坊勢島 ぼうぜじま Bozejima 兵庫県 姫路市",
    },
    {
      uid: "HYG_HMJ_NISHIJIMA",
      label: "西島(兵庫県姫路市)",
      target: "西島 にしじま Nishijima 兵庫県 姫路市",
    },
    {
      uid: "WKY_NCK_NAKANOSHIMA",
      label: "中の島(和歌山県那智勝浦町)",
      target: "中の島 なかのしま Nakanoshima 和歌山県 那智勝浦町",
    },
    {
      uid: "WKY_KSM_OHSHIMA",
      label: "大島(和歌山県串本町)",
      target: "大島 おおしま Ohshima 和歌山県 串本町",
    },
    {
      uid: "SMN_OKN_DOGO",
      label: "島後(島根県隠岐の島町)",
      target: "島後 どうご Dogo 島根県 隠岐の島町",
    },
    {
      uid: "SMN_AM_NAKANOSHIMA",
      label: "中ノ島(島根県海士町)",
      target: "中ノ島 なかのしま Nakanoshima 島根県 海士町",
    },
    {
      uid: "SMN_NSN_NISHINOSHIMA",
      label: "西ノ島(島根県西ノ島町)",
      target: "西ノ島 にしのしま Nishinoshima 島根県 西ノ島町",
    },
    {
      uid: "SMN_CB_CHIBURISHIMA",
      label: "知夫里島(島根県知夫村)",
      target: "知夫里島 ちぶりしま Chiburishima 島根県 知夫村",
    },
    {
      uid: "SMN_MTE_DAIKONJIMA",
      label: "大根島(島根県松江市)",
      target: "大根島 だいこんじま Daikonjima 島根県 松江市",
    },
    {
      uid: "SMN_MTE_ESHIMA",
      label: "江島(島根県松江市)",
      target: "江島 えしま Eshima 島根県 松江市",
    },
    {
      uid: "OKY_BZN_KAKUIJIMA",
      label: "鹿久居島(岡山県備前市)",
      target: "鹿久居島 かくいじま Kakuijima 岡山県 備前市",
    },
    {
      uid: "OKY_BZN_OHTABUJIMA",
      label: "大多府島(岡山県備前市)",
      target: "大多府島 おおたぶじま Ohtabujima 岡山県 備前市",
    },
    {
      uid: "OKY_BZN_KASIRAJIMA",
      label: "頭島(岡山県備前市)",
      target: "頭島 かしらじま Kasirajima 岡山県 備前市",
    },
    {
      uid: "OKY_BZN_KOUJIMA",
      label: "鴻島(岡山県備前市)",
      target: "鴻島 こうじま Koujima 岡山県 備前市",
    },
    {
      uid: "OKY_STU_NAGASHIMA",
      label: "長島(岡山県瀬戸内市)",
      target: "長島 ながしま Nagashima 岡山県 瀬戸内市",
    },
    {
      uid: "OKY_STU_MAEJIMA",
      label: "前島(岡山県瀬戸内市)",
      target: "前島 まえじま Maejima 岡山県 瀬戸内市",
    },
    {
      uid: "OKY_STU_KIJIMA",
      label: "黄島(岡山県瀬戸内市)",
      target: "黄島 きじま Kijima 岡山県 瀬戸内市",
    },
    {
      uid: "OKY_STU_KUROSHIMA",
      label: "黒島(岡山県瀬戸内市)",
      target: "黒島 くろしま Kuroshima 岡山県 瀬戸内市",
    },
    {
      uid: "OKY_OKY_INUJIMA",
      label: "犬島(岡山県岡山市)",
      target: "犬島 いぬじま Inujima 岡山県 岡山市",
    },
    {
      uid: "OKY_TMN_ISHIMA",
      label: "石島(岡山県玉野市)",
      target: "石島 いしま Ishima 岡山県 玉野市",
    },
    {
      uid: "OKY_KRS_MATSUSHIMA",
      label: "松島(岡山県倉敷市)",
      target: "松島 まつしま Matsushima 岡山県 倉敷市",
    },
    {
      uid: "OKY_KRS_MUGUCHIJIMA",
      label: "六口島(岡山県倉敷市)",
      target: "六口島 むぐちじま Muguchijima 岡山県 倉敷市",
    },
    {
      uid: "OKY_KSO_TAKASHIMA",
      label: "高島(岡山県笠岡市)",
      target: "高島 たかしま Takashima 岡山県 笠岡市",
    },
    {
      uid: "OKY_KSO_SIRAISIJIMA",
      label: "白石島(岡山県笠岡市)",
      target: "白石島 しらいしじま Siraisijima 岡山県 笠岡市",
    },
    {
      uid: "OKY_KSO_KITAGISIMA",
      label: "北木島(岡山県笠岡市)",
      target: "北木島 きたぎしま Kitagisima 岡山県 笠岡市",
    },
    {
      uid: "OKY_KSO_MANABESIMA",
      label: "真鍋島(岡山県笠岡市)",
      target: "真鍋島 まなべしま Manabesima 岡山県 笠岡市",
    },
    {
      uid: "OKY_KSO_KOBISIMA",
      label: "小飛島(岡山県笠岡市)",
      target: "小飛島 こびしま Kobisima 岡山県 笠岡市",
    },
    {
      uid: "OKY_KSO_OHBISIMA",
      label: "大飛島(岡山県笠岡市)",
      target: "大飛島 おおびしま Ohbisima 岡山県 笠岡市",
    },
    {
      uid: "OKY_KSO_MUSIMA",
      label: "六島(岡山県笠岡市)",
      target: "六島 むしま Musima 岡山県 笠岡市",
    },
    {
      uid: "HRS_FKY_HASIRIJIMA",
      label: "走島(広島県福山市)",
      target: "走島 はしりじま Hasirijima 広島県 福山市",
    },
    {
      uid: "HRS_FKY_TASIMA",
      label: "田島(広島県福山市)",
      target: "田島 たしま Tasima 広島県 福山市",
    },
    {
      uid: "HRS_FKY_YOKOSIMA",
      label: "横島(広島県福山市)",
      target: "横島 よこしま Yokosima 広島県 福山市",
    },
    {
      uid: "HRS_ONM_MOMOSIMA",
      label: "百島(広島県尾道市)",
      target: "百島 ももしま Momosima 広島県 尾道市",
    },
    {
      uid: "HRS_ONM_MUKAISIMA",
      label: "向島(広島県尾道市)",
      target: "向島 むかいしま Mukaisima 広島県 尾道市",
    },
    {
      uid: "HRS_ONM_IWASIJIMA",
      label: "岩子島(広島県尾道市)",
      target: "岩子島 いわしじま Iwasijima 広島県 尾道市",
    },
    {
      uid: "HRS_ONM_HOSOJIMA",
      label: "細島(広島県尾道市)",
      target: "細島 ほそじま Hosojima 広島県 尾道市",
    },
    {
      uid: "HRS_ONM_INNOSIMA",
      label: "因島(広島県尾道市)",
      target: "因島 いんのしま Innosima 広島県 尾道市",
    },
    {
      uid: "HRS_MHR_SAGIJIMA",
      label: "佐木島(広島県三原市)",
      target: "佐木島 さぎじま Sagijima 広島県 三原市",
    },
    {
      uid: "HRS_MHR_KOSAGIJIMA",
      label: "小佐木島(広島県三原市)",
      target: "小佐木島 こさぎじま Kosagijima 広島県 三原市",
    },
    {
      uid: "HRS_ONM_IKUCHIJIMA",
      label: "生口島(広島県尾道市)",
      target: "生口島 いくちじま Ikuchijima 広島県 尾道市",
    },
    {
      uid: "HRS_ONM_KOUNESIMA",
      label: "高根島(広島県尾道市)",
      target: "高根島 こうねしま Kounesima 広島県 尾道市",
    },
    {
      uid: "HRS_TKH_OHKUNOJIMA",
      label: "大久野島(広島県竹原市)",
      target: "大久野島 おおくのしま Ohkunojima 広島県 竹原市",
    },
    {
      uid: "HRS_OSK_CHIGIRIJIMA",
      label: "契島(広島県大崎上島町)",
      target: "契島 ちぎりじま Chigirijima 広島県 大崎上島町",
    },
    {
      uid: "HRS_OSK_IKUNOSIMA",
      label: "生野島(広島県大崎上島町)",
      target: "生野島 いくのしま Ikunosima 広島県 大崎上島町",
    },
    {
      uid: "HRS_OSK_OSAKIKAMIJIMA",
      label: "大崎上島(広島県大崎上島町)",
      target: "大崎上島 おおさきかみじま Osakikamijima 広島県 大崎上島町",
    },
    {
      uid: "HRS_OSK_NAGASHIMA",
      label: "長島(広島県大崎上島町)",
      target: "長島 ながしま Nagashima 広島県 大崎上島町",
    },
    {
      uid: "HRS_KR_OSAKSHIMOJIMA",
      label: "大崎下島(広島県呉市)",
      target: "大崎下島 おおさきしもじま Osakshimojima 広島県 呉市",
    },
    {
      uid: "HRS_KR_MIKADOJIMA",
      label: "三角島(広島県呉市)",
      target: "三角島 みかどじま Mikadojima 広島県 呉市",
    },
    {
      uid: "HRS_KR_TOYOSHIMA",
      label: "豊島(広島県呉市)",
      target: "豊島 とよしま Toyoshima 広島県 呉市",
    },
    {
      uid: "HRS_KR_ITSUKIJIMA",
      label: "斎島(広島県呉市)",
      target: "斎島 いつきしま Itsukijima 広島県 呉市",
    },
    {
      uid: "HRS_HGS_OHSHIBAJIMA",
      label: "大芝島(広島県東広島市)",
      target: "大芝島 おおしばじま Ohshibajima 広島県 東広島市",
    },
    {
      uid: "HRS_KR_KAMIKAMAGARIJIMA",
      label: "上蒲刈島(広島県呉市)",
      target: "上蒲刈島 かみかまがりじま Kamikamagarijima 広島県 呉市",
    },
    {
      uid: "HRS_KR_SHIMOKAMAGARIJIMA",
      label: "下蒲刈島(広島県呉市)",
      target: "下蒲刈島 しもかまがりじま Shimokamagarijima 広島県 呉市",
    },
    {
      uid: "HRS_KR_NASAKEJIMA",
      label: "情島(広島県呉市)",
      target: "情島 なさけじま Nasakejima 広島県 呉市",
    },
    {
      uid: "HRS_HRS_NINOSIMA",
      label: "似島(広島県広島市)",
      target: "似島 にのしま Ninosima 広島県 広島市",
    },
    {
      uid: "HRS_HRS_KANAWAJIMA",
      label: "金輪島(広島県広島市)",
      target: "金輪島 かなわじま Kanawajima 広島県 広島市",
    },
    {
      uid: "HRS_ETJ_ETAJIMA/NOUMISHIMA",
      label: "江田島・能美島(広島県江田島市)",
      target:
        "江田島・能美島 えたじま・のうみじま Etajima/Noumishima 広島県 江田島市",
    },
    {
      uid: "HRS_ETJ_OKINOSHIMA",
      label: "沖野島(広島県江田島市)",
      target: "沖野島 おきのしま Okinoshima 広島県 江田島市",
    },
    {
      uid: "HRS_KR_KURAHASIJIMA",
      label: "倉橋島(広島県呉市)",
      target: "倉橋島 くらはしじま Kurahasijima 広島県 呉市",
    },
    {
      uid: "HRS_KR_KASIMA",
      label: "鹿島(広島県呉市)",
      target: "鹿島 かしま Kasima 広島県 呉市",
    },
    {
      uid: "HRS_HTK_ITSUKUSIMA",
      label: "厳島(広島県廿日市市)",
      target: "厳島 いつくしま Itsukusima 広島県 廿日市市",
    },
    {
      uid: "HRS_OTK_ATATAJIMA",
      label: "阿多田島(広島県大竹市)",
      target: "阿多田島 あたたじま Atatajima 広島県 大竹市",
    },
    {
      uid: "YMGC_IWK_HASHIMA",
      label: "端島(山口県岩国市)",
      target: "端島 はしま Hashima 山口県 岩国市",
    },
    {
      uid: "YMGC_IWK_HASHIRAJIMA",
      label: "柱島(山口県岩国市)",
      target: "柱島 はしらじま Hashirajima 山口県 岩国市",
    },
    {
      uid: "YMGC_IWK_KUROSHIMA",
      label: "黒島(山口県岩国市)",
      target: "黒島 くろしま Kuroshima 山口県 岩国市",
    },
    {
      uid: "YMGC_SOO_YASHIROJIMA",
      label: "屋代島(山口県周防大島町)",
      target: "屋代島 やしろじま Yashirojima 山口県 周防大島町",
    },
    {
      uid: "YMGC_SOO_KASASAJIMA",
      label: "笠佐島(山口県周防大島町)",
      target: "笠佐島 かささじま Kasasajima 山口県 周防大島町",
    },
    {
      uid: "YMGC_SOO_MAEJIMA",
      label: "前島(山口県周防大島町)",
      target: "前島 まえじま Maejima 山口県 周防大島町",
    },
    {
      uid: "YMGC_SOO_UKASHIMA",
      label: "浮島(山口県周防大島町)",
      target: "浮島 うかしま Ukashima 山口県 周防大島町",
    },
    {
      uid: "YMGC_SOO_NASAKEJIMA",
      label: "情島(山口県周防大島町)",
      target: "情島 なさけじま Nasakejima 山口県 周防大島町",
    },
    {
      uid: "YMGC_SOO_OKIKAMUROJIMA",
      label: "沖家室島(山口県周防大島町)",
      target: "沖家室島 おきかむろじま Okikamurojima 山口県 周防大島町",
    },
    {
      uid: "YMGC_YNI_HEIGUNTO",
      label: "平郡島(山口県柳井市)",
      target: "平郡島 へいぐんとう Heigunto 山口県 柳井市",
    },
    {
      uid: "YMGC_KMN_NAGASHIMA",
      label: "長島(山口県上関町)",
      target: "長島 ながしま Nagashima 山口県 上関町",
    },
    {
      uid: "YMGC_KMN_YASHIMA",
      label: "八島(山口県上関町)",
      target: "八島 やしま Yashima 山口県 上関町",
    },
    {
      uid: "YMGC_KMN_IWAISHIMA",
      label: "祝島(山口県上関町)",
      target: "祝島 いわいしま Iwaishima 山口県 上関町",
    },
    {
      uid: "YMGC_HRO_SAGOJIMA",
      label: "佐合島(山口県平生町)",
      target: "佐合島 さごうじま Sagojima 山口県 平生町",
    },
    {
      uid: "YMGC_TBS_UMASHIMA",
      label: "馬島(山口県田布施町)",
      target: "馬島 うましま Umashima 山口県 田布施町",
    },
    {
      uid: "YMGC_HKR_USIMA",
      label: "牛島(山口県光市)",
      target: "牛島 うしま Usima 山口県 光市",
    },
    {
      uid: "YMGC_KDM_KADADOJIMA",
      label: "笠戸島(山口県下松市)",
      target: "笠戸島 かさどしま Kadadojima 山口県 下松市",
    },
    {
      uid: "YMGC_SYN_SUKUMOJIMA",
      label: "粭島(山口県周南市)",
      target: "粭島 すくもじま Sukumojima 山口県 周南市",
    },
    {
      uid: "YMGC_SYN_OHDUSHIMA",
      label: "大津島(山口県周南市)",
      target: "大津島 おおづしま Ohdushima 山口県 周南市",
    },
    {
      uid: "YMGC_HUF_NOSHIMA",
      label: "野島(山口県防府市)",
      target: "野島 のしま Noshima 山口県 防府市",
    },
    {
      uid: "YMGC_HUF_MUKOJIMA",
      label: "向島(山口県防府市)",
      target: "向島 むこうじま Mukojima 山口県 防府市",
    },
    {
      uid: "YMGC_SMN_TAKENOKOJIMA",
      label: "竹ノ子島(山口県下関市)",
      target: "竹ノ子島 たけのこじま Takenokojima 山口県 下関市",
    },
    {
      uid: "YMGC_SMN_HIKOSHIMA",
      label: "彦島(山口県下関市)",
      target: "彦島 ひこしま Hikoshima 山口県 下関市",
    },
    {
      uid: "YMGC_HG_MISHIMA",
      label: "見島(山口県萩市)",
      target: "見島 みしま Mishima 山口県 萩市",
    },
    {
      uid: "YMGC_HG_AISHIMA",
      label: "相島(山口県萩市)",
      target: "相島 あいしま Aishima 山口県 萩市",
    },
    {
      uid: "YMGC_HG_HITSUSHIMA",
      label: "櫃島(山口県萩市)",
      target: "櫃島 ひつしま Hitsushima 山口県 萩市",
    },
    {
      uid: "YMGC_HG_OHSHIMA",
      label: "大島(山口県萩市)",
      target: "大島 おおしま Ohshima 山口県 萩市",
    },
    {
      uid: "YMGC_NGT_OHMIJIMA",
      label: "青海島(山口県長門市)",
      target: "青海島 おおみじま Ohmijima 山口県 長門市",
    },
    {
      uid: "YMGC_SMN_TSUNOSHIMA",
      label: "角島(山口県下関市)",
      target: "角島 つのしま Tsunoshima 山口県 下関市",
    },
    {
      uid: "YMGC_SMN_HUTAOIJIMA",
      label: "蓋井島(山口県下関市)",
      target: "蓋井島 ふたおいじま Hutaoijima 山口県 下関市",
    },
    {
      uid: "YMGC_SMN_MUTSUREJIMA",
      label: "六連島(山口県下関市)",
      target: "六連島 むつれじま Mutsurejima 山口県 下関市",
    },
    {
      uid: "TKS_NRT_OHGESHIMA",
      label: "大毛島(徳島県鳴門市)",
      target: "大毛島 おおげしま Ohgeshima 徳島県 鳴門市",
    },
    {
      uid: "TKS_NRT_SHIMADAJIMA",
      label: "島田島(徳島県鳴門市)",
      target: "島田島 しまだじま Shimadajima 徳島県 鳴門市",
    },
    {
      uid: "TKS_ANN_ISHIMA",
      label: "伊島(徳島県阿南市)",
      target: "伊島 いしま Ishima 徳島県 阿南市",
    },
    {
      uid: "TKS_MG_TEBAJIMA",
      label: "出羽島(徳島県牟岐町)",
      target: "出羽島 てばじま Tebajima 徳島県 牟岐町",
    },
    {
      uid: "TKS_KIY_TAKEGASHIMA",
      label: "竹ヶ島(徳島県海陽町)",
      target: "竹ヶ島 たけがしま Takegashima 徳島県 海陽町",
    },
    {
      uid: "KGW__SHODOSHIMA",
      label: "小豆島(香川県小豆島町・土庄町)",
      target: "小豆島 しょうどしま Shodoshima 香川県 小豆島町・土庄町",
    },
    {
      uid: "KGW_TNS_OKINOSHIMA",
      label: "沖之島(香川県土庄町)",
      target: "沖之島 おきのしま Okinoshima 香川県 土庄町",
    },
    {
      uid: "KGW_TNS_ODESHIMA",
      label: "小豊島(香川県土庄町)",
      target: "小豊島 おでしま Odeshima 香川県 土庄町",
    },
    {
      uid: "KGW_TNS_TESHIMA",
      label: "豊島(香川県土庄町)",
      target: "豊島 てしま Teshima 香川県 土庄町",
    },
    {
      uid: "KGW_NOS_NAOSHIMA",
      label: "直島(香川県直島町)",
      target: "直島 なおしま Naoshima 香川県 直島町",
    },
    {
      uid: "KGW_NOS_MUKAEJIMA",
      label: "向島(香川県直島町)",
      target: "向島 むかえじま Mukaejima 香川県 直島町",
    },
    {
      uid: "KGW_NOS_BYOBUSHIMA",
      label: "屏風島(香川県直島町)",
      target: "屏風島 びょうぶしま Byobushima 香川県 直島町",
    },
    {
      uid: "KGW_TKM_OHSHIMA",
      label: "大島(香川県高松市)",
      target: "大島 おおしま Ohshima 香川県 高松市",
    },
    {
      uid: "KGW_TKM_OGIJIMA",
      label: "男木島(香川県高松市)",
      target: "男木島 おぎじま Ogijima 香川県 高松市",
    },
    {
      uid: "KGW_TKM_MEGIJIMA",
      label: "女木島(香川県高松市)",
      target: "女木島 めぎじま Megijima 香川県 高松市",
    },
    {
      uid: "KGW_SKI_HITSUISHIJIMA",
      label: "櫃石島(香川県坂出市)",
      target: "櫃石島 ひついしじま Hitsuishijima 香川県 坂出市",
    },
    {
      uid: "KGW_SKI_IWAKUROJIMA",
      label: "岩黒島(香川県坂出市)",
      target: "岩黒島 いわくろじま Iwakurojima 香川県 坂出市",
    },
    {
      uid: "KGW_SKI_YOSHIMA",
      label: "与島(香川県坂出市)",
      target: "与島 よしま Yoshima 香川県 坂出市",
    },
    {
      uid: "KGW_SKI_KOYOSHIMA",
      label: "小与島(香川県坂出市)",
      target: "小与島 こよしま Koyoshima 香川県 坂出市",
    },
    {
      uid: "KGW_MRG_USHIJIMA",
      label: "牛島(香川県丸亀市)",
      target: "牛島 うしじま Ushijima 香川県 丸亀市",
    },
    {
      uid: "KGW_MRG_HONJIMA",
      label: "本島(香川県丸亀市)",
      target: "本島 ほんじま Honjima 香川県 丸亀市",
    },
    {
      uid: "KGW_MRG_HIROSHIMA",
      label: "広島(香川県丸亀市)",
      target: "広島 ひろしま Hiroshima 香川県 丸亀市",
    },
    {
      uid: "KGW_MRG_TESHIMA",
      label: "手島(香川県丸亀市)",
      target: "手島 てしま Teshima 香川県 丸亀市",
    },
    {
      uid: "KGW_MRG_OTESHIMA",
      label: "小手島(香川県丸亀市)",
      target: "小手島 おてしま Oteshima 香川県 丸亀市",
    },
    {
      uid: "KGW_TDT_TAKAMIJIMA",
      label: "高見島(香川県多度津町)",
      target: "高見島 たかみじま Takamijima 香川県 多度津町",
    },
    {
      uid: "KGW_TDT_SANAGIJIMA",
      label: "佐柳島(香川県多度津町)",
      target: "佐柳島 さなぎじま Sanagijima 香川県 多度津町",
    },
    {
      uid: "KGW_MTY_AWASHIMA",
      label: "粟島(香川県三豊市)",
      target: "粟島 あわしま Awashima 香川県 三豊市",
    },
    {
      uid: "KGW_MTY_SHISHIJIMA",
      label: "志々島(香川県三豊市)",
      target: "志々島 ししじま Shishijima 香川県 三豊市",
    },
    {
      uid: "KGW_KNO_IBUKIJIMA",
      label: "伊吹島(香川県観音寺市)",
      target: "伊吹島 いぶきじま Ibukijima 香川県 観音寺市",
    },
    {
      uid: "EHM_KMJ_UOSHIMA",
      label: "魚島(愛媛県上島町)",
      target: "魚島 うおしま Uoshima 愛媛県 上島町",
    },
    {
      uid: "EHM_KMJ_TAKAIKAMISHIMA",
      label: "高井神島(愛媛県上島町)",
      target: "高井神島 たかいかみしま Takaikamishima 愛媛県 上島町",
    },
    {
      uid: "EHM_KMJ_YUGEJIMA",
      label: "弓削島(愛媛県上島町)",
      target: "弓削島 ゆげじま Yugejima 愛媛県 上島町",
    },
    {
      uid: "EHM_KMJ_SASHIMA",
      label: "佐島(愛媛県上島町)",
      target: "佐島 さしま Sashima 愛媛県 上島町",
    },
    {
      uid: "EHM_KMJ_IKINAJIMA",
      label: "生名島(愛媛県上島町)",
      target: "生名島 いきなじま Ikinajima 愛媛県 上島町",
    },
    {
      uid: "EHM_KMJ_IWAGIJIMA",
      label: "岩城島(愛媛県上島町)",
      target: "岩城島 いわぎじま Iwagijima 愛媛県 上島町",
    },
    {
      uid: "EHM_IMB_AKAHONEJIMA",
      label: "赤穂根島(愛媛県今治市)",
      target: "赤穂根島 あかほねじま Akahonejima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_OHMISHIMA",
      label: "大三島(愛媛県今治市)",
      target: "大三島 おおみしま Ohmishima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_HAKATAJIMA",
      label: "伯方島(愛媛県今治市)",
      target: "伯方島 はかたじま Hakatajima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_USHIMA",
      label: "鵜島(愛媛県今治市)",
      target: "鵜島 うしま Ushima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_OHSHIMA",
      label: "大島(愛媛県今治市)",
      target: "大島 おおしま Ohshima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_TSUSHIMA",
      label: "津島(愛媛県今治市)",
      target: "津島 つしま Tsushima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_OKAMURAJIMA",
      label: "岡村島(愛媛県今治市)",
      target: "岡村島 おかむらじま Okamurajima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_KOOGESHIMA",
      label: "小大下島(愛媛県今治市)",
      target: "小大下島 こおげしま Koogeshima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_OHGESHIMA",
      label: "大下島(愛媛県今治市)",
      target: "大下島 おおげしま Ohgeshima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_KURUSHIMA",
      label: "来島(愛媛県今治市)",
      target: "来島 くるしま Kurushima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_OSHIMA",
      label: "小島(愛媛県今治市)",
      target: "小島 おしま Oshima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_UMASHIMA",
      label: "馬島(愛媛県今治市)",
      target: "馬島 うましま Umashima 愛媛県 今治市",
    },
    {
      uid: "EHM_IMB_HIKJIMA",
      label: "比岐島(愛媛県今治市)",
      target: "比岐島 ひきじま Hikjima 愛媛県 今治市",
    },
    {
      uid: "EHM_NIH_OHSHIMA",
      label: "大島(愛媛県新居浜市)",
      target: "大島 おおしま Ohshima 愛媛県 新居浜市",
    },
    {
      uid: "EHM_MTY_AIJIMA",
      label: "安居島(愛媛県松山市)",
      target: "安居島 あいじま Aijima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_GOGOSHIMA",
      label: "興居島(愛媛県松山市)",
      target: "興居島 ごごしま Gogoshima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_TSURUSHIMA",
      label: "釣島(愛媛県松山市)",
      target: "釣島 つるしま Tsurushima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_NOGUTSUNAJIMA",
      label: "野忽那島(愛媛県松山市)",
      target: "野忽那島 のぐつなじま Nogutsunajima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_MUDUKIJIMA",
      label: "睦月島(愛媛県松山市)",
      target: "睦月島 むづきじま Mudukijima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_NAKAJIMA",
      label: "中島(愛媛県松山市)",
      target: "中島 なかじま Nakajima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_NUWAJIMA",
      label: "怒和島(愛媛県松山市)",
      target: "怒和島 ぬわじま Nuwajima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_TSUWAJISHIMA",
      label: "津和地島(愛媛県松山市)",
      target: "津和地島 つわじしま Tsuwajishima 愛媛県 松山市",
    },
    {
      uid: "EHM_MTY_FUTAGAMIJIMA",
      label: "二神島(愛媛県松山市)",
      target: "二神島 ふたがみじま Futagamijima 愛媛県 松山市",
    },
    {
      uid: "EHM_OZ_AOSHIMA",
      label: "青島(愛媛県大洲市)",
      target: "青島 あおしま Aoshima 愛媛県 大洲市",
    },
    {
      uid: "EHM_YWT_OHSHIMA",
      label: "大島(愛媛県八幡浜市)",
      target: "大島 おおしま Ohshima 愛媛県 八幡浜市",
    },
    {
      uid: "EHM_UWJ_KUSHIMA",
      label: "九島(愛媛県宇和島市)",
      target: "九島 くしま Kushima 愛媛県 宇和島市",
    },
    {
      uid: "EHM_UWJ_KASHIMA",
      label: "嘉島(愛媛県宇和島市)",
      target: "嘉島 かしま Kashima 愛媛県 宇和島市",
    },
    {
      uid: "EHM_UWJ_TOJIMA",
      label: "戸島(愛媛県宇和島市)",
      target: "戸島 とじま Tojima 愛媛県 宇和島市",
    },
    {
      uid: "EHM_UWJ_HIBURIJIMA",
      label: "日振島(愛媛県宇和島市)",
      target: "日振島 ひぶりじま Hiburijima 愛媛県 宇和島市",
    },
    {
      uid: "EHM_UWJ_TAKEGASHIMA",
      label: "竹ケ島(愛媛県宇和島市)",
      target: "竹ケ島 たけがしま Takegashima 愛媛県 宇和島市",
    },
    {
      uid: "KUC_SSK_NAKANOSHIMA",
      label: "中ノ島(高知県須崎市)",
      target: "中ノ島 なかのしま Nakanoshima 高知県 須崎市",
    },
    {
      uid: "KUC_SSK_HESHIMA",
      label: "戸島(高知県須崎市)",
      target: "戸島 へしま Heshima 高知県 須崎市",
    },
    {
      uid: "KUC_OTK_KASHIWAJIMA",
      label: "柏島(高知県大月町)",
      target: "柏島 かしわじま Kashiwajima 高知県 大月町",
    },
    {
      uid: "KUC_SKM_OHSHIMA",
      label: "大島(高知県宿毛市)",
      target: "大島 おおしま Ohshima 高知県 宿毛市",
    },
    {
      uid: "KUC_SKM_UGURUSHIMA",
      label: "鵜来島(高知県宿毛市)",
      target: "鵜来島 うぐるしま Ugurushima 高知県 宿毛市",
    },
    {
      uid: "KUC_SKM_OKINOSHIMA",
      label: "沖の島(高知県宿毛市)",
      target: "沖の島 おきのしま Okinoshima 高知県 宿毛市",
    },
    {
      uid: "FKO_KTK_UMASHIMA",
      label: "馬島(福岡県北九州市)",
      target: "馬島 うましま Umashima 福岡県 北九州市",
    },
    {
      uid: "FKO_KTK_AINOSHIMA",
      label: "藍島(福岡県北九州市)",
      target: "藍島 あいのしま Ainoshima 福岡県 北九州市",
    },
    {
      uid: "FKO_MNK_JINOSHIMA",
      label: "地島(福岡県宗像市)",
      target: "地島 じのしま Jinoshima 福岡県 宗像市",
    },
    {
      uid: "FKO_MNK_AOSHIMA",
      label: "大島(福岡県宗像市)",
      target: "大島 おおしま Aoshima 福岡県 宗像市",
    },
    {
      uid: "FKO_SNG_AINOSHIMA",
      label: "相島(福岡県新宮町)",
      target: "相島 あいのしま Ainoshima 福岡県 新宮町",
    },
    {
      uid: "FKO_FKO_SHIKANOSHIMA",
      label: "志賀島(福岡県福岡市)",
      target: "志賀島 しかのしま Shikanoshima 福岡県 福岡市",
    },
    {
      uid: "FKO_FKO_NOKONOSHIMA",
      label: "能古島(福岡県福岡市)",
      target: "能古島 のこのしま Nokonoshima 福岡県 福岡市",
    },
    {
      uid: "FKO_FKO_GENKAIJIMA",
      label: "玄界島(福岡県福岡市)",
      target: "玄界島 げんかいじま Genkaijima 福岡県 福岡市",
    },
    {
      uid: "FKO_FKO_ORONOSHIMA",
      label: "小呂島(福岡県福岡市)",
      target: "小呂島 おろのしま Oronoshima 福岡県 福岡市",
    },
    {
      uid: "FKO_ITS_HIMESHIMA",
      label: "姫島(福岡県糸島市)",
      target: "姫島 ひめしま Himeshima 福岡県 糸島市",
    },
    {
      uid: "SAG_KRT_TAKASHIMA",
      label: "高島(佐賀県唐津市)",
      target: "高島 たかしま Takashima 佐賀県 唐津市",
    },
    {
      uid: "SAG_KRT_KASIWAJIMA",
      label: "神集島(佐賀県唐津市)",
      target: "神集島 かしわじま Kasiwajima 佐賀県 唐津市",
    },
    {
      uid: "SAG_KRT_KABESHIMA",
      label: "加部島(佐賀県唐津市)",
      target: "加部島 かべしま Kabeshima 佐賀県 唐津市",
    },
    {
      uid: "SAG_KRT_OGAWAJIMA",
      label: "小川島(佐賀県唐津市)",
      target: "小川島 おがわしま Ogawajima 佐賀県 唐津市",
    },
    {
      uid: "SAG_KRT_KAKARASHIMA",
      label: "加唐島(佐賀県唐津市)",
      target: "加唐島 かからしま Kakarashima 佐賀県 唐津市",
    },
    {
      uid: "SAG_KRT_MATSUSHIMA",
      label: "松島(佐賀県唐津市)",
      target: "松島 まつしま Matsushima 佐賀県 唐津市",
    },
    {
      uid: "SAG_KRT_MADARASHIMA",
      label: "馬渡島(佐賀県唐津市)",
      target: "馬渡島 まだらしま Madarashima 佐賀県 唐津市",
    },
    {
      uid: "SAG_KRT_MUKUSHIMA",
      label: "向島(佐賀県唐津市)",
      target: "向島 むくしま Mukushima 佐賀県 唐津市",
    },
    {
      uid: "NGS_TSM_TSUSIMAJIMA",
      label: "対馬島(長崎県対馬市)",
      target: "対馬島 つしまじま Tsusimajima 長崎県 対馬市",
    },
    {
      uid: "NGS_TSM_UNIJIMA",
      label: "海栗島(長崎県対馬市)",
      target: "海栗島 うにじま Unijima 長崎県 対馬市",
    },
    {
      uid: "NGS_TSM_AKASHIMA",
      label: "赤島(長崎県対馬市)",
      target: "赤島 あかしま Akashima 長崎県 対馬市",
    },
    {
      uid: "NGS_TSM_TOMARISHIMA",
      label: "泊島(長崎県対馬市)",
      target: "泊島 とまりしま Tomarishima 長崎県 対馬市",
    },
    {
      uid: "NGS_TSM_OKINOSHIMA",
      label: "沖ノ島(長崎県対馬市)",
      target: "沖ノ島 おきのしま Okinoshima 長崎県 対馬市",
    },
    {
      uid: "NGS_TSM_SIMOYAMAJIMA",
      label: "島山島(長崎県対馬市)",
      target: "島山島 しまやまじま Simoyamajima 長崎県 対馬市",
    },
    {
      uid: "NGS_IK_IKINOSHIMA",
      label: "壱岐島(長崎県壱岐市)",
      target: "壱岐島 いきのしま Ikinoshima 長崎県 壱岐市",
    },
    {
      uid: "NGS_IK_OHSHIMA",
      label: "大島(長崎県壱岐市)",
      target: "大島 おおしま Ohshima 長崎県 壱岐市",
    },
    {
      uid: "NGS_IK_NAGASHIMA",
      label: "長島(長崎県壱岐市)",
      target: "長島 ながしま Nagashima 長崎県 壱岐市",
    },
    {
      uid: "NGS_IK_HARUSHIMA",
      label: "原島(長崎県壱岐市)",
      target: "原島 はるしま Harushima 長崎県 壱岐市",
    },
    {
      uid: "NGS_IK_WAKAMIYAJIMA",
      label: "若宮島(長崎県壱岐市)",
      target: "若宮島 わかみやじま Wakamiyajima 長崎県 壱岐市",
    },
    {
      uid: "NGS_MTU_FUKUSHIMA",
      label: "福島(長崎県松浦市)",
      target: "福島 ふくしま Fukushima 長崎県 松浦市",
    },
    {
      uid: "NGS_MTU_TAKASHIMA",
      label: "鷹島(長崎県松浦市)",
      target: "鷹島 たかしま Takashima 長崎県 松浦市",
    },
    {
      uid: "NGS_MTU_KUROSHIMA",
      label: "黒島(長崎県松浦市)",
      target: "黒島 くろしま Kuroshima 長崎県 松浦市",
    },
    {
      uid: "NGS_MTU_TOBISHIMA",
      label: "飛島(長崎県松浦市)",
      target: "飛島 とびしま Tobishima 長崎県 松浦市",
    },
    {
      uid: "NGS_MTU_AOSHIMA",
      label: "青島(長崎県松浦市)",
      target: "青島 あおしま Aoshima 長崎県 松浦市",
    },
    {
      uid: "NGS_HRD_ADUCHIOHSHIMA",
      label: "的山大島(長崎県平戸市)",
      target: "的山大島 あづちおおしま AduchiOhshima 長崎県 平戸市",
    },
    {
      uid: "NGS_HRD_TAKUSHIMA",
      label: "度島(長崎県平戸市)",
      target: "度島 たくしま Takushima 長崎県 平戸市",
    },
    {
      uid: "NGS_HRD_HIRADOSHIMA",
      label: "平戸島(長崎県平戸市)",
      target: "平戸島 ひらどしま Hiradoshima 長崎県 平戸市",
    },
    {
      uid: "NGS_HRD_TAKASHIMA",
      label: "高島(長崎県平戸市)",
      target: "高島 たかしま Takashima 長崎県 平戸市",
    },
    {
      uid: "NGS_HRD_IKITSUKIJIMA",
      label: "生月島(長崎県平戸市)",
      target: "生月島 いきつきじま Ikitsukijima 長崎県 平戸市",
    },
    {
      uid: "NGS_SSB_MAEJIMA",
      label: "前島(長崎県佐世保市)",
      target: "前島 まえじま Maejima 長崎県 佐世保市",
    },
    {
      uid: "NGS_SSB_TODOMARIJIMA",
      label: "鼕泊島(長崎県佐世保市)",
      target: "鼕泊島 とうどまりじま Todomarijima 長崎県 佐世保市",
    },
    {
      uid: "NGS_SSB_KUROSHIMA",
      label: "黒島(長崎県佐世保市)",
      target: "黒島 くろしま Kuroshima 長崎県 佐世保市",
    },
    {
      uid: "NGS_SSB_TAKASHIMA",
      label: "高島(長崎県佐世保市)",
      target: "高島 たかしま Takashima 長崎県 佐世保市",
    },
    {
      uid: "NGS_SSB_HARIOJIMA",
      label: "針尾島(長崎県佐世保市)",
      target: "針尾島 はりおじま Hariojima 長崎県 佐世保市",
    },
    {
      uid: "NGS_SSB_OHSHIMA",
      label: "大島(長崎県佐世保市)",
      target: "大島 おおしま Ohshima 長崎県 佐世保市",
    },
    {
      uid: "NGS_SIK_TAKENOSHIMA",
      label: "竹ノ島(長崎県西海市)",
      target: "竹ノ島 たけのしま Takenoshima 長崎県 西海市",
    },
    {
      uid: "NGS_NGS_USEJIMA",
      label: "鵜瀬島(長崎県長崎市)",
      target: "鵜瀬島 うせじま Usejima 長崎県 長崎市",
    },
    {
      uid: "NGS_TGT_MAEJIMA",
      label: "前島(長崎県時津町)",
      target: "前島 まえじま Maejima 長崎県 時津町",
    },
    {
      uid: "NGS_ISH_KASHIMA",
      label: "鹿島(長崎県諫早市)",
      target: "鹿島 かしま Kashima 長崎県 諫早市",
    },
    {
      uid: "NGS_SIK_OHSHIMA",
      label: "大島(長崎県西海市)",
      target: "大島 おおしま Ohshima 長崎県 西海市",
    },
    {
      uid: "NGS_SIK_TERASHIMA",
      label: "寺島(長崎県西海市)",
      target: "寺島 てらしま Terashima 長崎県 西海市",
    },
    {
      uid: "NGS_SIK_KAKIUNOURASHIMA",
      label: "蛎浦島(長崎県西海市)",
      target: "蛎浦島 かきのうらしま Kakiunourashima 長崎県 西海市",
    },
    {
      uid: "NGS_SIK_SAKITOJIMA",
      label: "崎戸島(長崎県西海市)",
      target: "崎戸島 さきとじま Sakitojima 長崎県 西海市",
    },
    {
      uid: "NGS_SIK_ENOSHIMA",
      label: "江島(長崎県西海市)",
      target: "江島 えのしま Enoshima 長崎県 西海市",
    },
    {
      uid: "NGS_SIK_HIRASHIMA",
      label: "平島(長崎県西海市)",
      target: "平島 ひらしま Hirashima 長崎県 西海市",
    },
    {
      uid: "NGS_SIK_NAGUSHIJIMA",
      label: "南串島(長崎県西海市)",
      target: "南串島 なぐしじま Nagushijima 長崎県 西海市",
    },
    {
      uid: "NGS_SIK_MATSUSHIMA",
      label: "松島(長崎県西海市)",
      target: "松島 まつしま Matsushima 長崎県 西海市",
    },
    {
      uid: "NGS_NGS_IKESHIMA",
      label: "池島(長崎県長崎市)",
      target: "池島 いけしま Ikeshima 長崎県 長崎市",
    },
    {
      uid: "NGS_NGS_IOHJIMA",
      label: "伊王島(長崎県長崎市)",
      target: "伊王島 いおうじま Iohjima 長崎県 長崎市",
    },
    {
      uid: "NGS_NGS_OKINOSHIMA",
      label: "沖之島(長崎県長崎市)",
      target: "沖之島 おきのしま Okinoshima 長崎県 長崎市",
    },
    {
      uid: "NGS_NGS_TAKASHIMA",
      label: "高島(長崎県長崎市)",
      target: "高島 たかしま Takashima 長崎県 長崎市",
    },
    {
      uid: "NGS_NGS_KABASHIMA",
      label: "樺島(長崎県長崎市)",
      target: "樺島 かばしま Kabashima 長崎県 長崎市",
    },
    {
      uid: "NGS_NGS_MAKISHIMA",
      label: "牧島(長崎県長崎市)",
      target: "牧島 まきしま Makishima 長崎県 長崎市",
    },
    {
      uid: "NGS_SSB_UKUJIMA",
      label: "宇久島(長崎県佐世保市)",
      target: "宇久島 うくじま Ukujima 長崎県 佐世保市",
    },
    {
      uid: "NGS_SSB_TERASHIMA",
      label: "寺島(長崎県佐世保市)",
      target: "寺島 てらしま Terashima 長崎県 佐世保市",
    },
    {
      uid: "NGS_ODK_MUSHIMA",
      label: "六島(長崎県小値賀町)",
      target: "六島 むしま Mushima 長崎県 小値賀町",
    },
    {
      uid: "NGS_ODK_NOZAKIJIMA",
      label: "野崎島(長崎県小値賀町)",
      target: "野崎島 のざきじま Nozakijima 長崎県 小値賀町",
    },
    {
      uid: "NGS_ODK_NOUSHIMA",
      label: "納島(長崎県小値賀町)",
      target: "納島 のうしま Noushima 長崎県 小値賀町",
    },
    {
      uid: "NGS_ODK_ODIKAJIMA",
      label: "小値賀島(長崎県小値賀町)",
      target: "小値賀島 おぢかじま Odikajima 長崎県 小値賀町",
    },
    {
      uid: "NGS_ODK_MADARASHIMA",
      label: "斑島(長崎県小値賀町)",
      target: "斑島 まだらしま Madarashima 長崎県 小値賀町",
    },
    {
      uid: "NGS_ODK_KUROSHIMA",
      label: "黒島(長崎県小値賀町)",
      target: "黒島 くろしま Kuroshima 長崎県 小値賀町",
    },
    {
      uid: "NGS_ODK_OHSHIMA",
      label: "大島(長崎県小値賀町)",
      target: "大島 おおしま Ohshima 長崎県 小値賀町",
    },
    {
      uid: "NGS_SNK_NAKADOURIJIMA",
      label: "中通島(長崎県新上五島町)",
      target: "中通島 なかどおりじま Nakadourijima 長崎県 新上五島町",
    },
    {
      uid: "NGS_SNK_KASHIRAGASHIMA",
      label: "頭ケ島(長崎県新上五島町)",
      target: "頭ケ島 かしらがしま Kashiragashima 長崎県 新上五島町",
    },
    {
      uid: "NGS_SNK_KIRINOKOJIMA",
      label: "桐ノ小島(長崎県新上五島町)",
      target: "桐ノ小島 きりのこじま Kirinokojima 長崎県 新上五島町",
    },
    {
      uid: "NGS_SNK_WAKAMATSUJIMA",
      label: "若松島(長崎県新上五島町)",
      target: "若松島 わかまつじま Wakamatsujima 長崎県 新上五島町",
    },
    {
      uid: "NGS_SNK_RYOUZAGAURASHIMA",
      label: "漁生浦島(長崎県新上五島町)",
      target: "漁生浦島 りょうぜがうらしま Ryouzagaurashima 長崎県 新上五島町",
    },
    {
      uid: "NGS_SNK_ARIFUKUJIMA",
      label: "有福島(長崎県新上五島町)",
      target: "有福島 ありふくじま Arifukujima 長崎県 新上五島町",
    },
    {
      uid: "NGS_SNK_HINOSHIMA",
      label: "日島(長崎県新上五島町)",
      target: "日島 ひのしま Hinoshima 長崎県 新上五島町",
    },
    {
      uid: "NGS_GTU_NARUSHIMA",
      label: "奈留島(長崎県五島市)",
      target: "奈留島 なるしま Narushima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_MAESHIMA",
      label: "前島(長崎県五島市)",
      target: "前島 まえしま Maeshima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_HISAKAJIMA",
      label: "久賀島(長崎県五島市)",
      target: "久賀島 ひさかじま Hisakajima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_WARABIKOJIMA",
      label: "蕨小島(長崎県五島市)",
      target: "蕨小島 わらびこじま Warabikojima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_KABASHIMA",
      label: "椛島(長崎県五島市)",
      target: "椛島 かばしま Kabashima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_FUKUEJIMA",
      label: "福江島(長崎県五島市)",
      target: "福江島 ふくえじま Fukuejima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_AKASHIMA",
      label: "赤島(長崎県五島市)",
      target: "赤島 あかしま Akashima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_OUSHIMA",
      label: "黄島(長崎県五島市)",
      target: "黄島 おうしま Oushima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_KUROSHIMA",
      label: "黒島(長崎県五島市)",
      target: "黒島 くろしま Kuroshima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_SHIMAYAMAJIMA",
      label: "島山島(長崎県五島市)",
      target: "島山島 しまやまじま Shimayamajima 長崎県 五島市",
    },
    {
      uid: "NGS_GTU_SAGANOSHIMA",
      label: "嵯峨島(長崎県五島市)",
      target: "嵯峨島 さがのしま Saganoshima 長崎県 五島市",
    },
    {
      uid: "KMM_UK_TOBASEJIMA",
      label: "戸馳島(熊本県宇城市)",
      target: "戸馳島 とばせじま Tobasejima 熊本県 宇城市",
    },
    {
      uid: "KMM_KMA_OHYANOJIMA",
      label: "大矢野島(熊本県上天草市)",
      target: "大矢野島 おおやのじま Ohyanojima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_IWAJIMA",
      label: "維和島(熊本県上天草市)",
      target: "維和島 いわじま Iwajima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_YAGYUUJIMA",
      label: "野牛島(熊本県上天草市)",
      target: "野牛島 やぎゅうじま Yagyuujima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_YUSHIMA",
      label: "湯島(熊本県上天草市)",
      target: "湯島 ゆしま Yushima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_NOGAMAJIMA",
      label: "野釜島(熊本県上天草市)",
      target: "野釜島 のがまじま Nogamajima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_NAGAURAJIMA",
      label: "永浦島(熊本県上天草市)",
      target: "永浦島 ながうらじま Nagaurajima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_HIAIJIMA",
      label: "樋合島(熊本県上天草市)",
      target: "樋合島 ひあいじま Hiaijima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_MAEJIMA",
      label: "前島(熊本県上天草市)",
      target: "前島 まえじま Maejima 熊本県 上天草市",
    },
    {
      uid: "KMM_KMA_NAKAJIMA",
      label: "中島(熊本県上天草市)",
      target: "中島 なかじま Nakajima 熊本県 上天草市",
    },
    {
      uid: "KMM__AMAKUSAKAMIJIMA",
      label: "天草上島(熊本県上天草市・天草市)",
      target:
        "天草上島 あまくさかみしま Amakusakamijima 熊本県 上天草市・天草市",
    },
    {
      uid: "KMM_KMA_HINOSHIMA",
      label: "樋島(熊本県上天草市)",
      target: "樋島 ひのしま Hinoshima 熊本県 上天草市",
    },
    {
      uid: "KMM_AMK_GOSYOURAJIMA",
      label: "御所浦島(熊本県天草市)",
      target: "御所浦島 ごしょうらじま Gosyourajima 熊本県 天草市",
    },
    {
      uid: "KMM_AMK_MAKISHIMA",
      label: "牧島(熊本県天草市)",
      target: "牧島 まきしま Makishima 熊本県 天草市",
    },
    {
      uid: "KMM_AMK_YOKOURAJIMA",
      label: "横浦島(熊本県天草市)",
      target: "横浦島 よこうらじま Yokourajima 熊本県 天草市",
    },
    {
      uid: "KMM__AMAKUSASHIMOJIMA",
      label: "天草下島(熊本県天草市・苓北町)",
      target:
        "天草下島 あまくさしもしま Amakusashimojima 熊本県 天草市・苓北町",
    },
    {
      uid: "KMM_AMK_TUUJISHIMA",
      label: "通詞島(熊本県天草市)",
      target: "通詞島 つうじしま Tuujishima 熊本県 天草市",
    },
    {
      uid: "KMM_AMK_YOKOSHIMA",
      label: "横島(熊本県天草市)",
      target: "横島 よこしま Yokoshima 熊本県 天草市",
    },
    {
      uid: "KMM_AMK_GESUSHIMA",
      label: "下須島(熊本県天草市)",
      target: "下須島 げすしま Gesushima 熊本県 天草市",
    },
    {
      uid: "OIT_HMJ_HIMESHIMA",
      label: "姫島(大分県姫島村)",
      target: "姫島 ひめしま Himeshima 大分県 姫島村",
    },
    {
      uid: "OIT_USK_KUROSHIMA",
      label: "黒島(大分県臼杵市)",
      target: "黒島 くろしま Kuroshima 大分県 臼杵市",
    },
    {
      uid: "OIT_TKM_HOTOJIMA",
      label: "保戸島(大分県津久見市)",
      target: "保戸島 ほとじま Hotojima 大分県 津久見市",
    },
    {
      uid: "OIT_TKM_JIMUKUJIMA",
      label: "地無垢島(大分県津久見市)",
      target: "地無垢島 じむくしま Jimukujima 大分県 津久見市",
    },
    {
      uid: "OIT_SIK_OHNYUJIMA",
      label: "大入島(大分県佐伯市)",
      target: "大入島 おおにゅうじま Ohnyujima 大分県 佐伯市",
    },
    {
      uid: "OIT_SIK_OHSHIMA",
      label: "大島(大分県佐伯市)",
      target: "大島 おおしま Ohshima 大分県 佐伯市",
    },
    {
      uid: "OIT_SIK_YAKATAJIMA",
      label: "屋形島(大分県佐伯市)",
      target: "屋形島 やかたじま Yakatajima 大分県 佐伯市",
    },
    {
      uid: "OIT_SIK_FUKASHIMA",
      label: "深島(大分県佐伯市)",
      target: "深島 ふかしま Fukashima 大分県 佐伯市",
    },
    {
      uid: "MYZ_NBO_SHIMANOURASHIMA",
      label: "島野浦島(宮崎県延岡市)",
      target: "島野浦島 しまのうらしま Shimanourashima 宮崎県 延岡市",
    },
    {
      uid: "MYZ_NCN_OHSHIMA",
      label: "大島(宮崎県日南市)",
      target: "大島 おおしま Ohshima 宮崎県 日南市",
    },
    {
      uid: "MYZ_KSM_TSUKISHIMA",
      label: "築島(宮崎県串間市)",
      target: "築島 つきしま Tsukishima 宮崎県 串間市",
    },
    {
      uid: "KGS_NGS_SISIJIMA",
      label: "獅子島(鹿児島県長島町)",
      target: "獅子島 ししじま Sisijima 鹿児島県 長島町",
    },
    {
      uid: "KGS_NGS_IKARAJIMA",
      label: "伊唐島(鹿児島県長島町)",
      target: "伊唐島 いからじま Ikarajima 鹿児島県 長島町",
    },
    {
      uid: "KGS_NGS_SYOURAJIMA",
      label: "諸浦島(鹿児島県長島町)",
      target: "諸浦島 しょうらじま Syourajima 鹿児島県 長島町",
    },
    {
      uid: "KGS_NGS_NAGASHIMA",
      label: "長島(鹿児島県長島町)",
      target: "長島 ながしま Nagashima 鹿児島県 長島町",
    },
    {
      uid: "KGS_IZM_KATSURAJIMA",
      label: "桂島(鹿児島県出水市)",
      target: "桂島 かつらじま Katsurajima 鹿児島県 出水市",
    },
    {
      uid: "KGS_STM_KAMIKOSHIKIJIMA",
      label: "上甑島(鹿児島県薩摩川内市)",
      target: "上甑島 かみこしきしま Kamikoshikijima 鹿児島県 薩摩川内市",
    },
    {
      uid: "KGS_STM_NAKAKOSHIKIJIMA",
      label: "中甑島(鹿児島県薩摩川内市)",
      target: "中甑島 なかこしきしま Nakakoshikijima 鹿児島県 薩摩川内市",
    },
    {
      uid: "KGS_STM_SHIMOKOSIKIJIMA",
      label: "下甑島(鹿児島県薩摩川内市)",
      target: "下甑島 しもこしきしま Shimokosikijima 鹿児島県 薩摩川内市",
    },
    {
      uid: "KGS_KGS_SHINJIMA",
      label: "新島(鹿児島県鹿児島市)",
      target: "新島 しんじま Shinjima 鹿児島県 鹿児島市",
    },
    {
      uid: "KGS__TANEGASHIMA",
      label: "種子島(鹿児島県西之表市・中種子町・南種子町)",
      target:
        "種子島 たねがしま Tanegashima 鹿児島県 西之表市・中種子町・南種子町",
    },
    {
      uid: "KGS_NSN_MAGESHIMA",
      label: "馬毛島(鹿児島県西之表市)",
      target: "馬毛島 まげしま Mageshima 鹿児島県 西之表市",
    },
    {
      uid: "KGS_YKS_YAKUSHIMA",
      label: "屋久島(鹿児島県屋久島町)",
      target: "屋久島 やくしま Yakushima 鹿児島県 屋久島町",
    },
    {
      uid: "KGS_YKS_KUCHINOERABUJIMA",
      label: "口永良部島(鹿児島県屋久島町)",
      target: "口永良部島 くちのえらぶじま Kuchinoerabujima 鹿児島県 屋久島町",
    },
    {
      uid: "KGS_MSM_TAKESHIMA",
      label: "竹島(鹿児島県三島村)",
      target: "竹島 たけしま Takeshima 鹿児島県 三島村",
    },
    {
      uid: "KGS_MSM_IOUJIMA",
      label: "硫黄島(鹿児島県三島村)",
      target: "硫黄島 いおうじま Ioujima 鹿児島県 三島村",
    },
    {
      uid: "KGS_MSM_KUROSHIMA",
      label: "黒島(鹿児島県三島村)",
      target: "黒島 くろしま Kuroshima 鹿児島県 三島村",
    },
    {
      uid: "KGS_TSM_KUCHINOSHIMA",
      label: "口之島(鹿児島県十島村)",
      target: "口之島 くちのしま Kuchinoshima 鹿児島県 十島村",
    },
    {
      uid: "KGS_TSM_NAKANOSHIMA",
      label: "中之島(鹿児島県十島村)",
      target: "中之島 なかのしま Nakanoshima 鹿児島県 十島村",
    },
    {
      uid: "KGS_TSM_SUWASENOJIMA",
      label: "諏訪之瀬島(鹿児島県十島村)",
      target: "諏訪之瀬島 すわのせじま Suwasenojima 鹿児島県 十島村",
    },
    {
      uid: "KGS_TSM_TAIRAJIMA",
      label: "平島(鹿児島県十島村)",
      target: "平島 たいらじま Tairajima 鹿児島県 十島村",
    },
    {
      uid: "KGS_TSM_AKUSEKIJIMA",
      label: "悪石島(鹿児島県十島村)",
      target: "悪石島 あくせきじま Akusekijima 鹿児島県 十島村",
    },
    {
      uid: "KGS_TSM_KODAKARAJIMA",
      label: "小宝島(鹿児島県十島村)",
      target: "小宝島 こだからじま Kodakarajima 鹿児島県 十島村",
    },
    {
      uid: "KGS_TSM_TAKARAJIMA",
      label: "宝島(鹿児島県十島村)",
      target: "宝島 たからじま Takarajima 鹿児島県 十島村",
    },
    {
      uid: "KGS__AMAMIOHSHIMA",
      label: "奄美大島(鹿児島県奄美市・大和村・宇検村・龍郷町・瀬戸内町)",
      target:
        "奄美大島 あまみおおしま AmamiOhshima 鹿児島県 奄美市・大和村・宇検村・龍郷町・瀬戸内町",
    },
    {
      uid: "KGS_STU_KAKEROMAJIMA",
      label: "加計呂麻島(鹿児島県瀬戸内町)",
      target: "加計呂麻島 かけろまじま Kakeromajima 鹿児島県 瀬戸内町",
    },
    {
      uid: "KGS_STU_UKESHIMA",
      label: "請島(鹿児島県瀬戸内町)",
      target: "請島 うけしま Ukeshima 鹿児島県 瀬戸内町",
    },
    {
      uid: "KGS_STU_YOROSHIMA",
      label: "与路島(鹿児島県瀬戸内町)",
      target: "与路島 よろしま Yoroshima 鹿児島県 瀬戸内町",
    },
    {
      uid: "KGS_KKI_KIKAIJIMA",
      label: "喜界島(鹿児島県喜界町)",
      target: "喜界島 きかいじま Kikaijima 鹿児島県 喜界町",
    },
    {
      uid: "KGS__TOKUNOSHIMA",
      label: "徳之島(鹿児島県徳之島町・伊仙町・天城町)",
      target: "徳之島 とくのしま Tokunoshima 鹿児島県 徳之島町・伊仙町・天城町",
    },
    {
      uid: "KGS__OKINOERABUJIMA",
      label: "沖永良部島(鹿児島県和泊町・知名町)",
      target:
        "沖永良部島 おきのえらぶじま Okinoerabujima 鹿児島県 和泊町・知名町",
    },
    {
      uid: "KGS_YRN_YORONJIMA",
      label: "与論島(鹿児島県与論町)",
      target: "与論島 よろんじま Yoronjima 鹿児島県 与論町",
    },
    {
      uid: "OKN_MNM_MINAMIDAITOUJIMA",
      label: "南大東島(沖縄県南大東村)",
      target: "南大東島 みなみだいとうじま Minamidaitoujima 沖縄県 南大東村",
    },
    {
      uid: "OKN_KID_KITADAITOUJIMA",
      label: "北大東島(沖縄県北大東村)",
      target: "北大東島 きただいとうじま Kitadaitoujima 沖縄県 北大東村",
    },
    {
      uid: "OKN_IHY_IHEYAJIMA",
      label: "伊平屋島(沖縄県伊平屋村)",
      target: "伊平屋島 いへやじま Iheyajima 沖縄県 伊平屋村",
    },
    {
      uid: "OKN_IHY_NOHOJIMA",
      label: "野甫島(沖縄県伊平屋村)",
      target: "野甫島 のほじま Nohojima 沖縄県 伊平屋村",
    },
    {
      uid: "OKN_IZN_IZENAJIMA",
      label: "伊是名島(沖縄県伊是名村)",
      target: "伊是名島 いぜなじま Izenajima 沖縄県 伊是名村",
    },
    {
      uid: "OKN_OGM_MIYAGIJIMA",
      label: "宮城島(沖縄県大宜味村)",
      target: "宮城島 みやぎじま Miyagijima 沖縄県 大宜味村",
    },
    {
      uid: "OKN_NKJ_KOURIJIMA",
      label: "古宇利島(沖縄県今帰仁村)",
      target: "古宇利島 こうりじま Kourijima 沖縄県 今帰仁村",
    },
    {
      uid: "OKN_NG_YAGAJISHIMA",
      label: "屋我地島(沖縄県名護市)",
      target: "屋我地島 やがじしま Yagajishima 沖縄県 名護市",
    },
    {
      uid: "OKN_IE_IEJIMA",
      label: "伊江島(沖縄県伊江村)",
      target: "伊江島 いえじま Iejima 沖縄県 伊江村",
    },
    {
      uid: "OKN_MTB_SESOKOJIMA",
      label: "瀬底島(沖縄県本部町)",
      target: "瀬底島 せそこじま Sesokojima 沖縄県 本部町",
    },
    {
      uid: "OKN_MTB_MINNASHIMA",
      label: "水納島(沖縄県本部町)",
      target: "水納島 みんなしま Minnashima 沖縄県 本部町",
    },
    {
      uid: "OKN_URM_HENZAJIMA",
      label: "平安座島(沖縄県うるま市)",
      target: "平安座島 へんざじま Henzajima 沖縄県 うるま市",
    },
    {
      uid: "OKN_URM_MIYAGIJIMA",
      label: "宮城島(沖縄県うるま市)",
      target: "宮城島 みやぎじま Miyagijima 沖縄県 うるま市",
    },
    {
      uid: "OKN_URM_IKEIJIMA",
      label: "伊計島(沖縄県うるま市)",
      target: "伊計島 いけいじま Ikeijima 沖縄県 うるま市",
    },
    {
      uid: "OKN_URM_HAMAHIGAJIMA",
      label: "浜比嘉島(沖縄県うるま市)",
      target: "浜比嘉島 はまひがじま Hamahigajima 沖縄県 うるま市",
    },
    {
      uid: "OKN_URM_TSUKENJIMA",
      label: "津堅島(沖縄県うるま市)",
      target: "津堅島 つけんじま Tsukenjima 沖縄県 うるま市",
    },
    {
      uid: "OKN_NNJ_KUDAKAJIMA",
      label: "久高島(沖縄県南城市)",
      target: "久高島 くだかじま Kudakajima 沖縄県 南城市",
    },
    {
      uid: "OKN_NNJ_OUJIMA",
      label: "奥武島(沖縄県南城市)",
      target: "奥武島 おうじま Oujima 沖縄県 南城市",
    },
    {
      uid: "OKN_TMG_SENAGAJIMA",
      label: "瀬長島(沖縄県豊見城市)",
      target: "瀬長島 せながじま Senagajima 沖縄県 豊見城市",
    },
    {
      uid: "OKN_TNK_MAESHIMA",
      label: "前島(沖縄県渡嘉敷村)",
      target: "前島 まえしま Maeshima 沖縄県 渡嘉敷村",
    },
    {
      uid: "OKN_TNK_TOKASHIKIJIMA",
      label: "渡嘉敷島(沖縄県渡嘉敷村)",
      target: "渡嘉敷島 とかしきじま Tokashikijima 沖縄県 渡嘉敷村",
    },
    {
      uid: "OKN_ZMM_ZAMAMIJIMA",
      label: "座間味島(沖縄県座間見村)",
      target: "座間味島 ざまみじま Zamamijima 沖縄県 座間見村",
    },
    {
      uid: "OKN_ZMM_AKASHIMA",
      label: "阿嘉島(沖縄県座間見村)",
      target: "阿嘉島 あかしま Akashima 沖縄県 座間見村",
    },
    {
      uid: "OKN_ZMM_GERUMAJIMA",
      label: "慶留間島(沖縄県座間見村)",
      target: "慶留間島 げるまじま Gerumajima 沖縄県 座間見村",
    },
    {
      uid: "OKN_AGN_AGUNIJIMA",
      label: "粟国島(沖縄県粟国村)",
      target: "粟国島 あぐにじま Agunijima 沖縄県 粟国村",
    },
    {
      uid: "OKN_TNK_TONAKIJIMA",
      label: "渡名喜島(沖縄県渡名喜村)",
      target: "渡名喜島 となきじま Tonakijima 沖縄県 渡名喜村",
    },
    {
      uid: "OKN_KMJ_KUMEJIMA",
      label: "久米島(沖縄県久米島町)",
      target: "久米島 くめじま Kumejima 沖縄県 久米島町",
    },
    {
      uid: "OKN_KMJ_OUJIMA",
      label: "奥武島(沖縄県久米島町)",
      target: "奥武島 おうじま Oujima 沖縄県 久米島町",
    },
    {
      uid: "OKN_KMJ_OHHAJIMA",
      label: "オーハ島(沖縄県久米島町)",
      target: "オーハ島 おーはじま Ohhajima 沖縄県 久米島町",
    },
    {
      uid: "OKN_MYK_MIYAKOJIMA",
      label: "宮古島(沖縄県宮古島市)",
      target: "宮古島 みやこじま Miyakojima 沖縄県 宮古島市",
    },
    {
      uid: "OKN_MYK_IKEMAJIMA",
      label: "池間島(沖縄県宮古島市)",
      target: "池間島 いけまじま Ikemajima 沖縄県 宮古島市",
    },
    {
      uid: "OKN_MYK_OHGAMIJIMA",
      label: "大神島(沖縄県宮古島市)",
      target: "大神島 おおがみじま Ohgamijima 沖縄県 宮古島市",
    },
    {
      uid: "OKN_MYK_KURIMAJIMA",
      label: "来間島(沖縄県宮古島市)",
      target: "来間島 くりまじま Kurimajima 沖縄県 宮古島市",
    },
    {
      uid: "OKN_MYK_IRABUJIMA",
      label: "伊良部島(沖縄県宮古島市)",
      target: "伊良部島 いらぶじま Irabujima 沖縄県 宮古島市",
    },
    {
      uid: "OKN_MYK_SHIMOJISHIMA",
      label: "下地島(沖縄県宮古島市)",
      target: "下地島 しもじしま Shimojishima 沖縄県 宮古島市",
    },
    {
      uid: "OKN_TRM_TARAMAJIMA",
      label: "多良間島(沖縄県多良間村)",
      target: "多良間島 たらまじま Taramajima 沖縄県 多良間村",
    },
    {
      uid: "OKN_TRM_MINNASHIMA",
      label: "水納島(沖縄県多良間村)",
      target: "水納島 みんなしま Minnashima 沖縄県 多良間村",
    },
    {
      uid: "OKN_ISG_ISHIGAKIJIMA",
      label: "石垣島(沖縄県石垣市)",
      target: "石垣島 いしがきじま Ishigakijima 沖縄県 石垣市",
    },
    {
      uid: "OKN_TKT_TAKETOMIJIMA",
      label: "竹富島(沖縄県竹富町)",
      target: "竹富島 たけとみじま Taketomijima 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_KOHAMAJIMA",
      label: "小浜島(沖縄県竹富町)",
      target: "小浜島 こはまじま Kohamajima 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_KAYAMAJIMA",
      label: "嘉弥真島(沖縄県竹富町)",
      target: "嘉弥真島 かやまじま Kayamajima 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_KUROSHIMA",
      label: "黒島(沖縄県竹富町)",
      target: "黒島 くろしま Kuroshima 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_ARAGUSUKUJIMA(KAMIJI)",
      label: "新城島上地(沖縄県竹富町)",
      target:
        "新城島上地 あらぐすくじま（かみじ） Aragusukujima(Kamiji) 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_ARAGUSUKUJIMA(SHIMOJI)",
      label: "新城島下地(沖縄県竹富町)",
      target:
        "新城島下地 あらぐすくじま（しもじ） Aragusukujima(Shimoji) 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_IRIOMOTEHIMA",
      label: "西表島(沖縄県竹富町)",
      target: "西表島 いりおもてじま Iriomotehima 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_YUBUJIMA",
      label: "由布島(沖縄県竹富町)",
      target: "由布島 ゆぶじま Yubujima 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_HATOMAJIMA",
      label: "鳩間島(沖縄県竹富町)",
      target: "鳩間島 はとまじま Hatomajima 沖縄県 竹富町",
    },
    {
      uid: "OKN_TKT_HATERUMAJIMA",
      label: "波照間島(沖縄県竹富町)",
      target: "波照間島 はてるまじま Haterumajima 沖縄県 竹富町",
    },
    {
      uid: "OKN_YNG_YONAGUNIJIMA",
      label: "与那国島(沖縄県与那国町)",
      target: "与那国島 よなぐにじま Yonagunijima 沖縄県 与那国町",
    },
];
