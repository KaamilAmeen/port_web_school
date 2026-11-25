import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("School content")
    .items([
      S.listItem()
        .title("Blog Management")
        .child(
          S.list()
            .title("Blog Management")
            .items([
              S.documentTypeListItem("blog").title("Articles"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),
      S.listItem()
        .title("Achievements")
        .child(S.documentTypeList("achievement").title("Achievements")),
      S.listItem()
        .title("Gallery")
        .child(S.documentTypeList("gallery").title("Gallery images")),
      S.listItem()
        .title("Announcements")
        .child(S.documentTypeList("announcement").title("Announcements")),
      S.divider(),
      S.documentTypeListItem("category").title("All categories"),
      S.documentTypeListItem("author").title("All authors"),
    ]);
