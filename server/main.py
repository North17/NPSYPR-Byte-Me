from flask import Flask
from flask_restful import Resource, Api, reqparse
import pymysql, os, random

if os.environ.get('GAE_ENV') == 'standard':
    unix_socket = '/cloudsql/{}'.format("byte-me-npsypr:asia-south1:byte-me-sql")
    con = pymysql.connect(unix_socket=unix_socket, user= "root", password="dbpasswd", database= "Bytebase")
 
else:
    con = pymysql.connect(host="localhost",port=2000, user="root", password="dbpasswd", database="Bytebase")


app = Flask(__name__)
api = Api(app)


class login(Resource):

    @staticmethod
    def recs(id, table):
        cur = con.cursor()
        cur.execute("select {0}, passwd from {1};".format(id, table))
        details = cur.fetchall()
        cur.close()

        return details


    def get(self):

        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("userId", required= True)
        parser.add_argument("password", required= True)

        dets = parser.parse_args()

        ids = self.recs("sid", "student")
        idt = self.recs("tid", "teacher")
        
        
        
        for id in ids:
            if dets['userId'] == id[0]:
                if dets['password'] == id[1]:
                    dets['type'] = 'student'
                    return {"authorised (student)": dets}, 200

        
        for id in idt:
            if dets['userId'] == id[0]:
                if dets['password'] == id[1]:
                    dets['type'] = 'teacher'
                    return {"authorised (teacher)": dets}, 200

        cur = con.cursor()
        return {"message": "not authorised"}, 401


class signupst(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("userId", required=True)
        parser.add_argument("age", required=True)
        parser.add_argument("password", required=True)

        args = parser.parse_args()
        cur.execute("select sid from student;")
        ids = cur.fetchall()
        idlist = []
        for a in ids:
            idlist.append(a[0])
        print(idlist)

        if args['userId'] in idlist:
            return {"message": "userId already in use"}, 401

        cur.execute("insert into student values('{0}', {1}, null, '{2}' );".format(args['userId'], args['age'], args['password']))
        con.commit()

        return {'message': 'Signup successful'}, 200

    def delete(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("userId", required=True)

        id = parser.parse_args()


        cur.execute("delete from student where sid= '{}';".format(id['userId']))
        con.commit()

        return {'message': 'Deleted'}, 200
    

class signupte(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("userId", required=True)
        parser.add_argument("password", required=True)

        args = parser.parse_args()
        cur.execute("select tid from teacher;")
        ids = cur.fetchall()
        idlist = []
        for a in ids:
            idlist.append(a[0])
        print(idlist)

        if args['userId'] in idlist:
            return {"message": "userId already in use"}, 401

        cur.execute("insert into teacher values('{0}', null, '{1}' );".format(args['userId'], args['password']))
        con.commit()

        return {'message': 'Signup successful'}, 200

    def delete(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("userId", required=True)

        id = parser.parse_args()


        cur.execute("delete from teacher where tid= '{}';".format(id['userId']))
        con.commit()

        return {'message': 'Deleted'}, 200


class Students(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("userId", required=True)
        id = parser.parse_args()
        id = id['userId']

        cur.execute("select * from enrollments, courses where enrollments.courseid = courses.courseid and enrollments.sid = '{}';".format(id))
        cour = cur.fetchall()
        courses = []
        for a in cour:
            d = {}
            d['sid'] = a[0]
            d['courseid'] = a[1]
            d['subject'] = a[3]
            d['title'] = a[4]
            d['desc'] = a[5]
            d['tid'] = a[6]
            d['lev'] = a[7]
            d['start'] = a[8]
            d['end'] = a[9]
            courses.append(d)                  
        
        cur = con.cursor()
        return {"message": courses}, 200


class Teachers(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("userId", required=True)
        id = parser.parse_args()
        id = id['userId']

        cur.execute("select * from courses where tid = '{}';".format(id))
        cour = cur.fetchall()
        courses = []
        for a in cour:
            d = {}
            d['courseid'] = a[0]
            d['subject'] = a[1]
            d['title'] = a[2]
            d['desc'] = a[3]
            d['tid'] = a[4]
            d['lev'] = a[5]
            d['start'] = a[6]
            d['end'] = a[7]
            courses.append(d)

        cur = con.cursor()                    
        return {"message": courses}, 200


class Course(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("courseId", required=True)
        id = parser.parse_args()
        id = id['courseId']

        x = cur.execute("select * from courses where courseid= '{}';".format(id))
        if x == 0:
            return {'message': "courseId not found"}, 401
        cour = cur.fetchall()    
        for a in cour:
            course = {}
            course['courseid'] = a[0]
            course['subject'] = a[1]
            course['title'] = a[2]
            course['desc'] = a[3]
            course['tid'] = a[4]
            course['lev'] = a[5]
            course['start'] = a[6]
            course['end'] = a[7]
            

        x = cur.execute("select * from classes where courseid= '{}';".format(id))
        cla = cur.fetchall()
        clas = []
        for a in cla:
            d = {}
            d['clasid'] = a[0]
            d['courseid'] = a[1]
            d['title'] = a[2]
            d['start'] = a[3]
            d['end'] = a[4]
            d['link'] = a[5]
            clas.append(d)
        
        cur.close()
        return [{"Course:": course}, {"Classes:": clas}], 200

    
    def post(self):

        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument('courseid', required=True)
        parser.add_argument('subject', required=True)
        parser.add_argument('title', required=True)
        parser.add_argument('descr', required=True)
        parser.add_argument('tid', required=True)
        parser.add_argument('lev', required=True)
        parser.add_argument('start', required=True)
        parser.add_argument('end', required=True)

        args = parser.parse_args()

        cur.execute('select courseid from courses;')
        t = cur.fetchall()
        courseids = []
        for a in t:
            courseids.append(a[0])

        if args['courseid'] in courseids:
            return {'message': "Class already exists"}, 401

        cur.execute("insert into courses values('{0}', '{1}', '{2}', '{3}', '{4}', {5}, '{6}', '{7}');".format(args['courseid'], args['subject'], args['title'], args['descr'], args['tid'], args['lev'], args['start'], args['end']))   
        con.commit()

        cur.close()
        return {'messages': "Course added"}, 200

    def delete(self):

        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument('courseid')

        id = parser.parse_args()
        id = id['courseid']

        cur.execute('select courseid from courses;')
        t = cur.fetchall()
        courseids = []
        for a in t:
            courseids.append(a[0])       

        if id not in courseids:
            return {'message': "Class does not exist"}, 401

        cur.execute("delete from classes where courseid = '{}';".format(id))
        cur.execute("delete from courses where courseid = '{}';".format(id))
        con.commit()

        cur.close()
        return {'message': "Course delete"}, 200


class Clas(Resource):

    def get(self):
        
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("classId", required=True)
        id = parser.parse_args()
        id = id['classId']
        

        x = cur.execute("select * from classes where classid= '{}';".format(id))
        if x == 0:
            return {'message': 'classId not found'}, 401
        a = cur.fetchall()
        a = a[0]
        d = {}
        d['clasid'] = a[0]
        d['courseid'] = a[1]
        d['title'] = a[2]
        d['start'] = a[3]
        d['end'] = a[4]
        d['link'] = a[5]
        
        cur = con.cursor()
        return {"Class:": d}, 200

    def post(self):

        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument('classid', required=True)
        parser.add_argument('courseid', required=True)
        parser.add_argument('title', required=True)
        parser.add_argument('start', required=True)
        parser.add_argument('end', required=True)
        parser.add_argument('link', required=True)

        args = parser.parse_args()

        cur.execute('select classid from classes;')
        t = cur.fetchall()
        classids = []
        for a in t:
            classids.append(a[0])
        
        if args['classid'] in classids:
            return {'message': "Class already exists"}, 401

        cur.execute("insert into classes values('{0}', '{1}', '{2}', '{3}', '{4}', '{5}');".format(args['classid'], args['courseid'], args['title'], args['start'], args['end'], args['link']))
        con.commit()

        cur.close()
        return {'message': "Class added"}, 200

    def delete(self):

        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument('classid', required=True)

        id = parser.parse_args()

        cur.execute('select classid from classes;')
        t = cur.fetchall()
        classids = []
        for a in t:
            classids.append(a[0])
        
        if id['classid'] not in classids:
            return {'message': "Class does not exist"}, 401

        cur.execute("delete from classes where classid= '{}';".format(id['classid']))
        con.commit()

        cur.close()
        return {'message': "Class deleted"}, 200

        
class Search(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("substring", required= True)

        ss = parser.parse_args()
        ss = ss['substring']

        cur.execute("select * from courses where title like '%{}%' or subject like '%{}%'; ".format(ss, ss))
        cour = cur.fetchall()    
        courses = []
        course = {}
        for a in cour:
            course = {}
            course['courseid'] = a[0]
            course['subject'] = a[1]
            course['title'] = a[2]
            course['desc'] = a[3]
            course['tid'] = a[4]
            course['lev'] = a[5]
            course['start'] = a[6]
            course['end'] = a[7]       
    
        
        cur.close()
        return {"Course:": course}, 200


class Enroll(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("sid", required= True)
        parser.add_argument("courseid", required= True)

        args = parser.parse_args()

        cur.execute("select * from enrollments;")
        t = cur.fetchall()
        for a in t:
            if a[0] == args['sid'] and a[1] == args['courseid']:
                return {'message': 'Already enrolled'}, 401


        cur.execute("insert into enrollments values('{0}','{1}' );".format(args['sid'], args['courseid']))
        con.commit()

        cur.close()
        return {'message': "Enrolled"}, 200

    def delete(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("sid", required= True)

        parser.add_argument("courseid", required= True)

        args = parser.parse_args()

        cur.execute("select * from enrollments;")
        t = cur.fetchall()
        for a in t:
            if a[0] == args['sid'] and a[1] == args['courseid']:
                cur.execute("delete from enrollments where sid = '{0}' and courseid= '{1}';".format(args['sid'], args['courseid']))
                con.commit()
                cur.close()
                return {'message': "Deleted"}, 200
        else:
            cur.close()
            return {'message': "No enrollment found"}, 401


class Reviews(Resource):

    def get(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument("courseid", required=True)
        
        id = parser.parse_args()
        id = id['courseid']

        cur.execute("select * from reviews where courseid = '{}';".format(id))
        t = cur.fetchall()
        reviews = []
        for a in t:
            d = {}
            d['reviewid'] = a[0]
            d['sid'] = a[1]
            d['courseid'] = a[2]
            d['title'] = a[3]
            d['stars'] = a[4]
            d['descr'] = a[5]
            reviews.append(d)

        cur.close()
        return {'reviews': reviews}, 200

    def post(self):
        cur = con.cursor()
        parser = reqparse.RequestParser()
        parser.add_argument('sid', required=True)
        parser.add_argument('courseid', required=True)
        parser.add_argument('title', required=True)
        parser.add_argument('stars', required=True)
        parser.add_argument('descr', required=True)

        args = parser.parse_args()

        cur.execute('select sid, courseid from reviews;')
        tups = cur.fetchall()
        for tup in tups:
            if tup[0] == args['sid'] and tup[1] == args['courseid']:
                return {'message':'review already exists'},401


        args['reviewid'] = str(random.randrange(1000000, 10000000))

        cur.execute("insert into reviews values('{0}', '{1}', '{2}', '{3}', {4}, '{5}' );".format(args['reviewid'], args['sid'], args['courseid'], args['title'], int(args['stars']), args['descr']))
        con.commit()

        cur.close()
        return {'message':'Review added'}, 200



api.add_resource(login, "/login")
api.add_resource(Students, "/students/courses")
api.add_resource(Teachers, "/teachers/courses")
api.add_resource(Course, "/course")
api.add_resource(Clas, "/class")
api.add_resource(signupst, "/studentsignup")
api.add_resource(signupte, "/teachersignup")
api.add_resource(Search, "/search")
api.add_resource(Enroll, "/enrollments")
api.add_resource(Reviews, "/reviews")



if __name__ == '__main__':
    app.run()
