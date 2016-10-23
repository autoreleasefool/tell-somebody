require 'test_helper'

class ClassroomControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get classroom_create_url
    assert_response :success
  end

  test "should get add_user" do
    get classroom_add_user_url
    assert_response :success
  end

  test "should get add_commendation" do
    get classroom_add_commendation_url
    assert_response :success
  end

end
