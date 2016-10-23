require 'test_helper'

class CommendationControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get commendation_new_url
    assert_response :success
  end

  test "should get approve" do
    get commendation_approve_url
    assert_response :success
  end

end
