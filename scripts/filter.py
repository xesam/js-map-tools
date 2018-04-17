from datetime import datetime

#处理用户的IC卡刷卡数据

def parse_datetime(datetime_str):
    if len(datetime_str) == 0:
        return None
    else:
        return datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')


users = {}

with open('./019.csv', encoding="gbk") as in_file:
    with open('./019.filter.csv', mode='w', encoding="utf-8") as filter_file:
        in_file.readline()
        for line in in_file:
            fields = line.strip().split(',')
            user_id = fields[2]
            car_no = fields[5]
            pos_line_no = fields[7]
            pos_time = fields[8]
            run_line_no = fields[14]
            direction = fields[15]
            on_stop_order = fields[17]
            on_stop_name = fields[18]
            on_stop_time = fields[19]
            off_stop_order = fields[21]
            off_stop_name = fields[22]
            off_stop_time = fields[23]
            record = [
                user_id, car_no, pos_line_no,
                run_line_no, direction,
                parse_datetime(pos_time), 
                int(on_stop_order), on_stop_name,
                parse_datetime(on_stop_time),
                int(off_stop_order), off_stop_name,
                parse_datetime(off_stop_time)
            ]
            if user_id not in users:
                users[user_id] = []
            users[user_id].append(record)

def inspect_user(user_id):
    records = users[user_id]
    records = sorted(records, key=lambda r: r[5])
    for record in records:
        print(record)

inspect_user('5100001197277948')