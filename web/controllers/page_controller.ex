defmodule ReduxChatHedgehog.PageController do
  use ReduxChatHedgehog.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
