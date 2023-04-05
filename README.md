# CanastaPM

Canasta PM (Canasta Project Management) is a package of wiki pages (templates, forms, etc.) that provide a structure for storing project management information. It is meant to be installed via the MediaWiki extension [Page Exchange](https://www.mediawiki.org/wiki/Extension:Page_Exchange). It is based in large part on the [SemanticActions](https://www.mediawiki.org/wiki/Extension:SemanticActions) MediaWiki extension, which also handles project management.

Though it includes "Canasta" in its name, Canasta PM does not require the [Canasta](https://canasta.wiki/) MediaWiki bundle to be used. Nevertheless, all the extensions that Canasta PM requires (including [Page Forms](https://www.mediawiki.org/wiki/Extension:Page_Forms), [Cargo](https://www.mediawiki.org/wiki/Extension:Cargo) and [Header Tabs](https://www.mediawiki.org/wiki/Extension:Header_Tabs)) are included in Canasta.

Among Canasta PM's features are editable labels and statuses, and a drag-and-drop [Kanban board](https://en.wikipedia.org/wiki/Kanban_board), in which moving a task from one status column to another will indeed change that task's own status.

To make use of this package within your wiki, add the following lines to LocalSettings.php, below the inclusion of Page Exchange:

```php
$wgPageExchangePackageFiles[] = 'https://raw.githubusercontent.com/CanastaWiki/CanastaPM/main/page-exchange.json';
$wgRestrictDisplayTitle = false;
```
