const params = {};
const { search } = window.location;

if (search && search !== '?') {
  const paramStrs = search.replace(/^\?/, '');
  paramStrs.split(/&(?!amp;)/).forEach((pair) => {
    let k;
    let v;
    const sindex = pair.indexOf('=');

    if (sindex === -1) {
      [k, v] = [pair, ''];
    } else {
      [k, v] = [
        pair.substring(0, sindex),
        sindex < pair.length - 1
          ? '' : pair.substring(sindex + 1),
      ];
    }

    if (k in params) {
      if (!Array.isArray(params[k])) {
        params[k] = [params[k]];
      }
      params[k].push(v);
    } else {
      params[k] = v;
    }
  });
}

export default (name, defaultValue = null) => params[name] || defaultValue;
