import json

jsons = []
with open('../data/019_20180302.csv', encoding="utf-8") as in_file:
    for line in in_file:
        line = line.strip()
        o_stop_name, o_datatime, o_lng, o_lat, d_stop_name, d_datetime, d_lng, d_lat, *rest = line.split(',') 
        jsons.append({
            'o_stop_name':o_stop_name,
            'o_datatime':o_datatime,
            'o_lng':float(o_lng),
            'o_lat':float(o_lat),
            'd_stop_name':d_stop_name,
            'd_datetime':d_datetime,
            'd_lng':float(d_lng),
            'd_lat':float(d_lat)
        })

with open('../data/019_20180302.json', mode='w', encoding='utf-8') as out_file:
    json.dump(jsons, out_file)