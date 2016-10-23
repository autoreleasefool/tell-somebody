require 'test_helper'

class ReportControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get report_new_url
    assert_response :success
  end

  test "should get resolve" do
    get report_resolve_url
    assert_response :success
  end

end
