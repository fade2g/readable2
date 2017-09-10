import {combineReducers} from "redux";
import {categories} from "./categories";
import {posts} from "./posts";
import {comments} from "./comments";
import {ui} from "./ui";
import {loading} from "./loading";

export default combineReducers({categories, posts, comments, ui, loading});
