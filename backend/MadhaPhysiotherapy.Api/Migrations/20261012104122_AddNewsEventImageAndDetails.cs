using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MadhaPhysiotherapy.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddNewsEventImageAndDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "NewsEvents",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "NewsEvents",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFeatured",
                table: "NewsEvents");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "NewsEvents");
        }
    }
}
