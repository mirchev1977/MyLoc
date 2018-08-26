package MyLoc;
use Dancer2;
use Data::Dumper;
use Digest::MD5 qw(md5);
use UserRoutes;

our $VERSION = '0.1';
#my  $db_test = Db::Db::get_db();
#
#
#get '/' => sub {
#    my $user = body_parameters->get('user');
#
#    "<h1>Home</h1>"
#};
#
#get '/users/all' => sub {
#    my $users = Db::Db::fetch_users();
#
#    header 'Access-Control-Allow-Origin' => '*';
#    content_type 'application/json';
#
#    return to_json $users;
#};
#
#get '/user/:id' => sub {
#    my $id = route_parameters->get('id');
#    my $user = Db::Db::get_one_users( $id );
#
#    content_type 'application/json';
#    return to_json $user;
#};
#
#get '/user/create/:username/:password/:name' => sub {
#    my $username = route_parameters->get('username');
#    my $password = route_parameters->get('password');
#    my $name     = route_parameters->get('name');
#    Db::Db::insert_one_user( $username, $password, $name );
#    "$username == $password == $name"
#};
#
#post '/users/update' => sub {
#    my $users = body_parameters->get('users');
#    Db::Db::update_users( $users );
#
#    header 'Access-Control-Allow-Origin' => '*';
#
#    return to_json { STATUS => "OK" };
#};
#
#post '/users/delete' => sub {
#    my $users = body_parameters->get('users');
#    Db::Db::delete_users( 'USERS', $users );
#    Db::Db::delete_users( 'LOGGEDIN', $users );
#
#    header 'Access-Control-Allow-Origin' => '*';
#
#    return to_json { STATUS => "OK" };
#};
#
#post '/users/register' => sub {
#    my $user = body_parameters->get('user');
#    my $u =  decode_json( $user );
#    my $created = Db::Db::insert_one_user( $u->{ 'USERNAME' }, $u->{ 'PASSWORD' }, $u->{ 'NAME' } );
#
#    $created->{ 'ROLE' } = 'USER';
#
#    session( 'logged' => $created );
#    my $sess_id = session->{ 'id' };
#
#    Db::Db::insert_into_loggedin(
#        $sess_id, $created->{ 'ID' }, $created->{ 'USERNAME' }, $created->{ 'PASSWORD' }, $created->{ 'ROLE' },
#        $created->{ 'NAME' }
#    );
#
#    $created->{ 'TOKEN' } = $sess_id;
#
#    header 'Access-Control-Allow-Origin' => '*';
#
#    return to_json { REGISTERED => $created };
#};
#
#post '/check/loggedin' => sub {
#    my $user = body_parameters->get('user');
#    my $loggedin = Db::Db::get_loggedin( $user );
#
#    my $resp = { STAT => $loggedin };
#
#    header 'Access-Control-Allow-Origin' => '*'; 
#    content_type 'application/json';
#
#    return to_json $resp;
#};
#
#post '/user/login' => sub {
#    my $user = body_parameters->get('user');
#    $user = Db::Db::user_login( $user );
#    session( 'logged' => $user );
#    my $sess_id = session->{ 'id' };
#
#    Db::Db::insert_into_loggedin(
#        $sess_id, $user->{ 'ID' }, $user->{ 'USERNAME' }, $user->{ 'PASSWORD' }, $user->{ 'ROLE' },
#        $user->{ 'NAME' }
#    );
#
#    $user->{ 'TOKEN' } = $sess_id;
#
#    header 'Access-Control-Allow-Origin' => '*'; 
#    content_type 'application/json';
#
#    return to_json $user;
#};
#
#post '/logout' => sub {
#    my $token = body_parameters->get('token');
#    Db::Db::logout( $token );
#    my $stat = { STAT => 'OK' };
#
#    header 'Access-Control-Allow-Origin' => '*'; 
#    content_type 'application/json';
#
#    return to_json $stat;
#};
#get '/service/route' => sub {
#    #Db::Db::create_table_users();
#    #Db::Db::insert_into_users();
#    #Db::Db::delete_from_users( 2 );
#    #Db::Db::create_table_logged_in();
#    "it is ok..."
#};

true;
