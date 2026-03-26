# HigiRapid Content/Admin Expansion QA Checklist

## Scope

- Header navigation updates (`HR-Club`, `Blog`) on desktop and mobile.
- Homepage additions (`HR-Club` teaser and `Why choose us` section).
- New pages: `/{locale}/hr-club`, `/{locale}/blog`, `/{locale}/blog/{slug}`, `/{locale}/facade-cleaning`.
- Admin additions: `Blog` management, `Leads` inbox, HR-Club lead recipient email in settings.
- Lead flow: public HR-Club form -> DB row -> admin visibility -> status update.

## Functional checks

- [ ] Header no longer shows `Gallery`/`Testimonials`; shows `HR-Club` and `Blog`.
- [ ] `HR-Club` teaser CTA on homepage opens localized `/{locale}/hr-club`.
- [ ] `Why choose us` section appears near bottom of homepage.
- [ ] `Blog` index shows articles and each card opens article route.
- [ ] Article template renders title, excerpt, and body paragraphs.
- [ ] `Facade cleaning` page loads for each locale.

## Admin checks

- [ ] Admin sidebar includes `Blog` and `Leads`.
- [ ] Admin can create/edit/delete blog posts with EN/ES/CA copy.
- [ ] Admin settings allows saving `HR-Club recipient email`.
- [ ] Leads page lists submissions newest first and allows status/note updates.

## Lead capture checks

- [ ] HR-Club form validates required fields and consent.
- [ ] Successful submit returns success state and resets form.
- [ ] Lead row stores `locale`, `sourcePath`, contact fields, message, and status.
- [ ] Updating lead status persists after page reload.

## Localization checks

- [ ] New nav labels and new sections are translated in `en`, `es`, and `ca`.
- [ ] Blog fallback content appears localized when DB posts are missing.
- [ ] No missing translation keys on new views.

## Regression checks

- [ ] Existing admin sections (`settings`, `services`, `gallery`, `content`) still load and save.
- [ ] Existing homepage sections still render and animate normally.
- [ ] Build passes with no type errors.

## Go/No-Go gate

- Go if all functional/admin/lead/localization checks pass and no P1/P2 issues.
- No-Go if lead capture, blog routing, or admin save workflows fail in any locale.
