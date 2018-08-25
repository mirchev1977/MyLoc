package MyLoc;
use Dancer2;
use Db::Db;
use Data::Dumper;
use Digest::MD5 qw(md5);

our $VERSION = '0.1';
my  $db_test = Db::Db::get_db();


get '/' => sub {
    #Db::Db::create_table_users();
    #Db::Db::insert_into_users();
    #Db::Db::delete_from_users( 2 );
    
    #my $write = $db_test->{ 'insert' }();
    #return to_json [
    #    { one => $write, two => $write }, 
    #    { one => $write, two => $write }, 
    #    { one => $write, two => $write }, 
    #];
    my $sess = session( 'logged' ) || { logged => {} };

    print "miro:sess: " . Dumper( $sess );

    return to_json( $sess );
};

get '/users/all' => sub {
    my $users = Db::Db::fetch_users();

    header 'Access-Control-Allow-Origin' => '*';
    content_type 'application/json';

    return to_json $users;
};

get '/user/:id' => sub {
    my $id = route_parameters->get('id');
    my $user = Db::Db::get_one_users( $id );

    content_type 'application/json';
    return to_json $user;
};

get '/user/create/:username/:password/:name' => sub {
    my $username = route_parameters->get('username');
    my $password = route_parameters->get('password');
    my $name     = route_parameters->get('name');
    Db::Db::insert_one_user( $username, $password, $name );
    "$username == $password == $name"
};

get '/roll/update/:id/:role' => sub {
    my $id = route_parameters->get('id');
    my $role = route_parameters->get('role');
    Db::Db::update_users_role( $id, $role );

    content_type 'application/json';
    return to_json { $id => $role, message => 'successfully updated' };
};

get '/next/:tableName' => sub {
    my $table_name = route_parameters->get( 'tableName' );
    my $next_id = Db::Db::get_next_id( $table_name );
    content_type 'application/json';
    "$next_id"
};

post '/users/update' => sub {
    my $users = body_parameters->get('users');
    Db::Db::update_users( $users );

    header 'Access-Control-Allow-Origin' => '*';

    return to_json { STATUS => "OK" };
};

post '/users/delete' => sub {
    my $users = body_parameters->get('users');
    Db::Db::delete_users( $users );

    header 'Access-Control-Allow-Origin' => '*';

    return to_json { STATUS => "OK" };
};

post '/users/register' => sub {
    my $user = body_parameters->get('user');
    my $u =  decode_json( $user );
    my $created = Db::Db::insert_one_user( $u->{ 'USERNAME' }, $u->{ 'PASSWORD' }, $u->{ 'NAME' } );

    $created->{ 'ROLE' } = 'USER';
    #id' => 'W4D4U8zZ2tUmX-aIcZ0kxq5kINMG-S5i',
    #             'is_dirty' => 1,
    #             'data' => {
    #                         'logged' => {
    #                                       'TOKEN' => 't<�����F��4��X',
    #                                       'USERNAME' => 'simo',
    #                                       'ID' => 33,
    #                                       'ROLE' => 'USER',
    #                                       'NAME' => 'simo'
    #                                     }
    #                       }
    #           }, 'Dancer2::Core::Session' );


    session( 'logged' => $created );
    my $sess_id = session->{ 'id' };
    my $sess_data = session->{ 'data' }->{ 'logged' };
    my $sess = {
        id   => $sess_id,
        data => $sess_data,
    };

    my $json_session = to_json( $sess );
    $created->{ 'SESS' } = $json_session;

    header 'Access-Control-Allow-Origin' => '*';

    return to_json { REGISTERED => $created };
};

#get '/users/register' => sub {
#    my $hr = { one => 1, two => 2 };
#
#    session( 'logged', $hr );
#
#    "<h1>Test: users/register</h1>"
#};

true;
