# Hello


This is my response to [this coding challenge](https://complete-spell.glitch.me/).

We're sorting by the number of times a particular character from a set appears in an input string. To do this, I'll use a simple histogram. The histogram will be a JS object where the key is a character and the value is the number of times that character appears in the input string. The following function takes a histogram object `h` and updates it given an `item` argument:

```
function updateHistogram(h, item) {
  if (item in h) {
    h[item]++;
  }
  return h;
}
```

Using it looks something like this:

```
print(updateHistogram({a: 1, b: 1}, 'b'));

```

We could just count the frequency of any character we encounter, but the challenge gives us a specific set of characters to sort:

```
const charSet = 'abcdefghijklmnopqrstuvwxyz_';
```

There's a chance the input string might contain other characters as well. So I'll initialize the histogram with the provided character range.

```
let histogram = {};
charSet.split('').forEach(c => histogram[c] = 0);
print(histogram);
```

We can use the `updateHistogram` function to *reduce* an array of all the input characters into a histogram.

```
histogram = Array.from(input).reduce(updateHistogram, histogram);
print(histogram);
```

To sort the histogram, I'll first convert it to an array where each entry is itself an array of the character and its frequency:


```
let histogramArray = Object.entries(histogram);
print(histogramArray);
plotBars(histogramArray);
```

We can't use the bare `Array.prototype.sort()` on this kind of structure, but it does take a comparison function. We'll write one that compares the frequencies for sorting.

```
// the frequency is at index 1 of each entry
let sorted = histogramArray.sort((a, b) => a[1] < b[1] ? 1 : -1);
print(sorted);
plotBars(sorted);
```

Once it's sorted, we no longer need the frequencies, so let's discard them and keep just the sorted characters:

```
let output = sorted.map(entry => entry[0]);
print(output);
```

I think I see a solution in there! The original prompt asked me to discard everying from the `_` character onward, so let's find that.

```
let underscoreIdx = output.indexOf('_');
output = output.slice(0,underscoreIdx);
print(output);
```

And for good measure, convert it back to a string.

```
print('The answer is: ' + output.join(''));
```

Et Viola!


```defs
// The provided input data
const input = 'qrwvxe_x_ewtapisxtgykuoxnplrxqmdozkobjlti_iktabpuavehz_rqynb_vmpnkvhovxannkqzsmnubgrtdjgzakrezxiynciyhgflnymhcubdcg_fghvgehiivootpxhahwrndedwxzolrhhtvdudzqjejvbuuoyqofxftnhjbovnktyrsgukomqkiqaaenn__lxykiqqgnsboqomahwkjwzgfgsjgrvuc_ujxkwttjpinmyccrecrrortybmpdx_iekclflmamybrirjrwyxfo_jgndzskf_keotgdnxkrqthfacjgycxbebhngdiyblzntzomhdsptamocekrkwffwueeixkbng_hldmvgawd_iyutj_dsgb_qtnzy_ickysfuoa_lrezbhfshewfiegmzonellzjyqqptvbis_byofwufqlpforkb_ansvxckwovcdxsvi_hdftqyqyekwtpbkwyxrkcxww_kpaeaubrbbggioexxbbmymvarelnsijtkixhzrrvmazojdgalkrrrmlxjvfvquzstbcjscnzosxjctwsacyalwid_pcjbenotwweeambujzgyexko_oqpaxydpiyhohalfpctjjmuhyqvasryxzfevvunkbmysaolqnercepqmgfmavvkjtcbblgrickhtlfqvfwyg_zuo_pakss_ozbbypeekxqbil_ebldtvyyvhuuauudzy_vhhkytavjrcifgdavjenefoowbifdssgyqietogjiktktd_ozavrqkhjovxhlzazzgad_uoofciajy_zvlispksgsjlynfckjxgsgjtzggvojnip_prnlgtvfmvrsxsmhvnxzcmdinzkxp_qrobrlkskiemkni_cpgm_dowyhfybdiagvrpzajgwyjskrlkxjjhpov_ieuxxyrwpsocson_qaygcbpkgnyezgcaegahpccwhycvzdyfdnildj_couiujhmkkkrhfwhkipoeuxaca_rjdmythtzkxjupvnupmjgchedrhapasmdod_gftkhywaj_szieahylimhvvkszhdnsdkygnqxndbmqtonbapgv_bjirmhxkskeipbaeh_axfysurodvnefelemawxqpmfw_sburpgipkm_niwzvrhqvlbyadgm_omydsubygfdgijhfot_rbslfrwnsidypvf_booetpoiqmaikmuludzexgbqb_obqjl_xzzioprpybnsipghjssyuuswpmvxlkutzbqyzwob_npubipnwnbhrdcdjgjdxjdzbqhyvdgagjeyiecsaijlfvuorjcminesyhdkg_bltedctwuodratvcskckwaoyexqwtetzezpjuwddmuvhdghopcknudxritydigvmcdrenpsqhjrbvuccbqc_ewwmwwjrhuslxdyyfb_ukax_szaherkplcdcnkaiqgzcuivagorjdinhrkfolnggmfsbnrnlgaswptwbfaaeckdhsnikcowoitkrg_hidmxn_ebjaha_gqlmvhiydzuskcligbvsfl_ldvcuuk_upfzcrpqwvklykwdzhjmcdumamyvizxajdqiijqqqvlfgfgyblslbxcgqld_zdanglpejkgkefaylx_uyynsskj_uaih_rocidouzyjtfxzwknipesazredyhkfnmxctehennjmmojxebwnetgytojasjthcyjy_krcqzkto_puwa_xsrvhqsypryxajdhxcbwlogejsmruviftrdqor_sfjiienbkblnumhspoedzygaaohpxjuwocmjijjwywpovvqlrdw_axxkpuzkmqdrrdbzcdzvoqtcapvcsoj__leexi_qhinqolpfeged_ubicbodeccamjpnpuegzcf_pnfvleysnrbxypmxkczakfwebpqdrgslnt_aapzxrhmbjgwgrqsxuebfpqvwaouxmvezrkgtchodbqvozffcpqklcuzuydfkungeylgysqzkocmfaysbeimmzebkwtrcrritzcbtoqvszx__dyfrquvvqahmfsjdtrymnrpzota__labzhl_vahbkztvjodzzrxrpuniqinotbodbnprvbebknuspcqzjmfzltucveeftfrouxzcidyewmyfzbp__hvnmqfbpinpjlleaaziszhmnmxlbjozuyet_ulpkfipwqlgupixftglbnmpvfeoqybtvdpbarcaswndnj_kkprm_x_whmqxerqqmewyajcdrbrfehlsqwwfemyfhwebwtc_tygcumongjtwiibnegcpqstuvfkwnycnpgitowmkzu_khflawn';
```
