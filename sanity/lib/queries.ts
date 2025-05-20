import { defineQuery } from "next-sanity";

/**
 * STARTUPS_QUERY:
 * Fetches all startups, optionally filtering by the search term for title, category, or author name, ordered by creation date.
 */
export const  STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,
  title, 
  slug,
  _createdAt,
  author -> { 
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

/**
 * STARTUP_BY_ID_QUERY:
 * Fetches a single startup by its _id, returning all relevant fields.
 */
export const STARTUP_BY_ID_QUERY = 
defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
  description,
  category,
  image,
  pitch,
}`);

/**
 * STARTUP_VIEWS_QUERY:
 * Fetches only the views for a startup by its _id.
 */
export const STARTUP_VIEWS_QUERY =
defineQuery(`*[_type == "startup" && _id == $id][0]{
 _id, 
 views
}`);

/**
 * AUTHOR_BY_GITHUB_ID_QUERY:
 * Fetches an author document based on a GitHub user ID field.
 */
export const AUTHOR_BY_GITHUB_ID_QUERY =
defineQuery(`*[_type == "auhor" && id == $id][0]{
  _id,
  id,
  name,
  username,
  image,
  bio,
  email
}`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
  `);

  export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);
  