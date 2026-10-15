using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MadhaPhysiotherapy.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddNewsEventContentAndType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "NewsEvents",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "NewsEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Excerpt",
                table: "NewsEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "NewsEvents");

            migrationBuilder.DropColumn(
                name: "Excerpt",
                table: "NewsEvents");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "NewsEvents",
                newName: "Description");
        }
    }
}
