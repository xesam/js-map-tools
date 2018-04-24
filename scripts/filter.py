from datetime import datetime
import sys

#处理用户的IC卡刷卡数据


def parse_datetime(datetime_str):
    if len(datetime_str) == 0:
        return None
    else:
        return datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')


def str_datetime(datetime_obj):
    if datetime_obj is None:
        return ''
    else:
        return datetime.strftime(datetime_obj, '%Y-%m-%d %H:%M:%S')


def get_users(in_file):
    users = {}
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
            user_id, car_no, pos_line_no, run_line_no, direction,
            parse_datetime(pos_time),
            int(on_stop_order), on_stop_name,
            parse_datetime(on_stop_time),
            int(off_stop_order), off_stop_name,
            parse_datetime(off_stop_time)
        ]
        if user_id not in users:
            users[user_id] = []
        users[user_id].append(record)
    return users


def inspect_user(users, user_id):
    records = users[user_id]
    records = sorted(records, key=lambda r: r[5])
    for record in records:
        print(record)


def export_user(user_records, out_file):
    records = sorted(user_records, key=lambda r: r[5])
    for record in records:
        d = [
            record[0], record[1], record[2], record[3], record[4],
            str_datetime(record[5]),
            str(record[6]), record[7],
            str_datetime(record[8]),
            str(record[9]), record[10],
            str_datetime(record[11])
        ]
        out_file.write(','.join(d))
        out_file.write('\n')


def export_users(users):
    for user_id in users.keys():
        records = users[user_id]
        with open(
                '../data/{0}.csv'.format(user_id), mode="w",
                encoding="utf-8") as out_file:
            export_user(records, out_file)


if __name__ == '__main__':
    in_file_path = sys.argv[1]
    with open(in_file_path, encoding="utf-8") as in_file:
        users_0 = get_users(in_file)
        export_users(users_0)
